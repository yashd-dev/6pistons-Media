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

async function getAuthors() {
  const query = `*[_type == "author"] {
    "currentSlug": slug.current,
    "lastModified": _updatedAt
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, authors] = await Promise.all([getData(), getAuthors()]);
  
  const postUrls: MetadataRoute.Sitemap = posts.map((post: SanityDocument) => ({
    url: `https://www.6pistons.com/article/${post.currentSlug}`,
    lastModified: post.lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const authorUrls: MetadataRoute.Sitemap = authors.map((author: SanityDocument) => ({
    url: `https://www.6pistons.com/author/${author.currentSlug}`,
    lastModified: author.lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: "https://www.6pistons.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.6pistons.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...postUrls,
    ...authorUrls,
  ];
}
export const revalidate = 3600;
