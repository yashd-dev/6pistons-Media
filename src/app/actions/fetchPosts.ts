"use server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function fetchPosts(
  page = 1,
  pageSize = 9,
  category?: string | null
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  let query = groq`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    description,
    categories[]->{ title }
  }`;

  let params = {};

  if (category) {
    query = groq`*[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      description,
      categories[]->{ title }
    }`;
    params = { category };
  }

  const countQuery = category
    ? groq`count(*[_type == "post" && $category in categories[]->title])`
    : groq`count(*[_type == "post"])`;

  const [posts, totalCount] = await Promise.all([
    client.fetch(query + `[${start}...${end}]`, params),
    client.fetch(countQuery, params),
  ]);

  return { posts, totalCount };
}

export async function fetchCategories() {
  const query = groq`*[_type == "category"] { title }`;
  return client.fetch(query);
}
