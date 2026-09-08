import type { MetadataRoute } from "next";
import type { SanityDocument } from "@sanity/client";
import { client } from "@/sanity/lib/client";

async function getPosts() {
  const query = `*[_type == "post"] {
    "currentSlug": slug.current,
    "lastModified": _updatedAt
  }`;
  return client.fetch(query);
}

async function getAuthors() {
  const query = `*[_type == "author"] {
    "currentSlug": slug.current,
    "lastModified": _updatedAt
  }`;
  return client.fetch(query);
}

async function getCategories() {
  const query = `*[_type == "category"] {
    "title": title,
    "lastModified": _updatedAt
  }`;
  return client.fetch(query);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, authors, categories] = await Promise.all([
    getPosts(),
    getAuthors(),
    getCategories(),
  ]);

  const postUrls: MetadataRoute.Sitemap = posts.map(
    (post: SanityDocument) => ({
      url: `https://www.6pistons.com/article/${post.currentSlug}`,
      lastModified: post.lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const authorUrls: MetadataRoute.Sitemap = authors.map(
    (author: SanityDocument) => ({
      url: `https://www.6pistons.com/author/${author.currentSlug}`,
      lastModified: author.lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  const categoryUrls: MetadataRoute.Sitemap = categories.map(
    (cat: SanityDocument) => {
      const slug = cat.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return {
        url: `https://www.6pistons.com/category/${slug}`,
        lastModified: cat.lastModified || new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      };
    }
  );

  const now = new Date().toISOString();

  return [
    {
      url: "https://www.6pistons.com",
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://www.6pistons.com/about",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.6pistons.com/contact",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.6pistons.com/editorial-guidelines",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.6pistons.com/privacy",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.6pistons.com/terms",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...categoryUrls,
    ...postUrls,
    ...authorUrls,
  ];
}

export const revalidate = 3600;
