import type { MetadataRoute } from "next";
import type { SanityDocument } from "@sanity/client";
import { client } from "@/sanity/lib/client";

async function getData() {
  const query = `*[_type == "post"] {
    "currentSlug": slug.current,
    "lastModified": _updatedAt
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getData();
  const posts: MetadataRoute.Sitemap = data.map((post: SanityDocument) => ({
    url: `https://www.6pistons.com/article/${post.currentSlug}`,
    lastModified: post.lastModified,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return [
    {
      url: "https://www.6pistons.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.6pistons.com/article",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...posts,
  ];
}
export const revalidate = 3600;
