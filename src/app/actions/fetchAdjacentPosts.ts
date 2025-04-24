"use server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function fetchAdjacentPosts(currentSlug: string) {
  const currentPostQuery = groq`*[_type == "post" && slug.current == $slug][0] {
    publishedAt
  }`;

  const currentPost = await client.fetch(currentPostQuery, {
    slug: currentSlug,
  });

  if (!currentPost) {
    return { previousPost: null, nextPost: null };
  }

  const previousPostQuery = groq`*[
    _type == "post" && 
    publishedAt < $publishedAt
  ] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    description
  }`;

  const nextPostQuery = groq`*[
    _type == "post" && 
    publishedAt > $publishedAt
  ] | order(publishedAt asc)[0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    description
  }`;

  const [previousPost, nextPost] = await Promise.all([
    client.fetch(previousPostQuery, { publishedAt: currentPost.publishedAt }),
    client.fetch(nextPostQuery, { publishedAt: currentPost.publishedAt }),
  ]);

  return { previousPost, nextPost };
}

export async function fetchMorePosts(currentSlug: string, limit = 1) {
  const query = groq`{
    "currentPost": *[_type == "post" && slug.current == $slug][0] {
      publishedAt
    },
    "morePosts": *[
      _type == "post" && 
      slug.current != $slug
    ] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
      description,
      body,
      categories[]->{ title },
      author->{name, image, slug}
    }
  }`;

  const result = await client.fetch(query, {
    slug: currentSlug,
    limit: limit,
  });

  return result.morePosts;
}
