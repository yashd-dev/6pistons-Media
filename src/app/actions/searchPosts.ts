"use server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function searchPosts(query: string, category?: string | null) {
  if (!query || query.trim() === "") {
    return { posts: [] };
  }

  let searchQuery = groq`*[_type == "post" && (
    title match $searchTerm || 
    description match $searchTerm ||
    pt::text(body) match $searchTerm
  )] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    description,
    categories[]->{ title }
  }`;

  const params: any = {
    searchTerm: `*${query}*`,
  };

  if (category && category !== "all") {
    searchQuery = groq`*[_type == "post" && (
      title match $searchTerm || 
      description match $searchTerm ||
      pt::text(body) match $searchTerm
    ) && $category in categories[]->title] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
      description,
      categories[]->{ title }
    }`;
    params.category = category;
  }

  const posts = await client.fetch(searchQuery, params);
  return { posts };
}
