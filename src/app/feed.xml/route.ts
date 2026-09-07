import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface FeedPost {
  title: string;
  slug: string;
  description?: string;
  publishedAt?: string;
  updatedAt: string;
  authorName?: string;
  categoryTitle?: string;
}


export async function GET() {
  const query = `*[_type == "post"] | order(coalesce(publishedAt, _updatedAt) desc)[0...50] {
    "title": title,
    "slug": slug.current,
    "description": description,
    "publishedAt": publishedAt,
    "updatedAt": _updatedAt,
    "authorName": author->name,
    "categoryTitle": categories[0]->title
  }`;

  try {
    const posts: FeedPost[] = await client.fetch(query);

    const siteUrl = "https://www.6pistons.com";
    const now = new Date().toUTCString();

    const itemsXml = posts
      .filter((post) => Boolean(post.slug && post.title))
      .map((post) => {
        const url = `${siteUrl}/article/${post.slug}`;
        const pubDate = new Date(
          post.publishedAt || post.updatedAt
        ).toUTCString();
        const description = post.description
          ? `<![CDATA[${post.description}]]>`
          : `<![CDATA[Read the complete review and analysis on 6Pistons Media.]]>`;

        return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      ${post.authorName ? `<dc:creator><![CDATA[${post.authorName}]]></dc:creator>` : ""}
      ${post.categoryTitle ? `<category><![CDATA[${post.categoryTitle}]]></category>` : ""}
    </item>`;
      })
      .join("\n");

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[6Pistons Media — Motor Reviews Done Right]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[Professional motor and automotive reviews by 6Pistons Media. Expert analysis, detailed road tests, and comprehensive coverage of the latest vehicles.]]></description>
    <language>en-US</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/logo.svg</url>
      <title><![CDATA[6Pistons Media]]></title>
      <link>${siteUrl}</link>
    </image>
${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("[RSS Feed] Error generating feed:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>6Pistons Media</title><link>https://www.6pistons.com</link></channel></rss>`,
      {
        status: 500,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      }
    );
  }
}
