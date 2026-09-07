import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const INDEXNOW_KEY = "1a95cab9d41b0bc349288fcd09ed3507";
const SITE_URL = "https://www.6pistons.com";

/**
 * Ping IndexNow API to notify Bing, DuckDuckGo, Yandex, and Seznam
 * about newly published or updated content for instant indexing.
 */
async function pingIndexNow(urls: string[]) {
  if (urls.length === 0) return;

  try {
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "www.6pistons.com",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
  } catch (error) {
    // IndexNow ping is best-effort — don't fail the webhook
    console.error("[IndexNow] Ping failed:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, process.env.SANITY_WEBHOOK_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    // Revalidate sitemap and homepage
    revalidatePath("/sitemap.xml");
    revalidatePath("/");

    // Build list of URLs to ping for instant indexing
    const urlsToPing: string[] = [SITE_URL];

    if (body._type === "post" && body.slug) {
      const articleUrl = `${SITE_URL}/article/${body.slug}`;
      revalidatePath(`/article/${body.slug}`);
      urlsToPing.push(articleUrl);
    }

    if (body._type === "author" && body.slug) {
      const authorUrl = `${SITE_URL}/author/${body.slug}`;
      revalidatePath(`/author/${body.slug}`);
      urlsToPing.push(authorUrl);
    }

    // Fire-and-forget IndexNow ping
    pingIndexNow(urlsToPing);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      indexNowPinged: urlsToPing,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
