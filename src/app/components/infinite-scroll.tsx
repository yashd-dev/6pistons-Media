"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { fetchMorePosts } from "@/app/actions/fetchAdjacentPosts";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  description: string;
  body: any;
  estimatedReadingTime: number;
  categories: { title: string }[];
  author: {
    name: string;
    image: any;
    slug: { current: string };
  };
}

interface InfiniteScrollProps {
  currentSlug: string;
}

export default function InfiniteScroll({ currentSlug }: InfiniteScrollProps) {
  const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const isLoaderInView = useInView(loaderRef);
  const [loadedSlugs, setLoadedSlugs] = useState<string[]>([currentSlug]);

  const PortableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).width(800).height(450).url() || "/placeholder.svg"}
          alt={value.alt || ""}
          width={800}
          height={450}
          className="rounded-lg object-cover w-full"
        />
      ),
    },
  };

  useEffect(() => {
    const loadMorePosts = async () => {
      if (isLoaderInView && !isLoading && hasMore) {
        setIsLoading(true);
        try {
          const morePosts = await fetchMorePosts(currentSlug, 1);

          const newPosts = morePosts.filter(
            (post: Post) => !loadedSlugs.includes(post.slug.current)
          );

          if (newPosts.length === 0) {
            setHasMore(false);
          } else {
            setLoadedPosts((prev) => [...prev, ...newPosts]);
            setLoadedSlugs((prev) => [
              ...prev,
              ...newPosts.map((post: Post) => post.slug.current),
            ]);

            if (newPosts.length > 0) {
              const latestPost = newPosts[newPosts.length - 1];
              window.history.pushState(
                { slug: latestPost.slug.current },
                "",
                `/article/${latestPost.slug.current}`
              );

              document.title = `${latestPost.title} | 6Pistons`;
            }
          }
        } catch (error) {
          console.error("Error loading more posts:", error);
          setHasMore(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadMorePosts();
  }, [isLoaderInView, isLoading, hasMore, currentSlug, loadedSlugs]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.slug) {
        window.location.href = `/article/${event.state.slug}`;
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (loadedPosts.length === 0 && !isLoading && !hasMore) {
    return null;
  }

  return (
    <div className="mt-16">
      {loadedPosts.map((post) => (
        <article
          key={post._id}
          className="mb-16 pt-16 border-t border-white/10"
        >
          <header className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-BrandRed font-bigShoulders text-center">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              {post.author && (
                <Link
                  href={`/author/${post.author.slug.current}`}
                  className="flex items-center gap-2"
                >
                  {post.author.image && (
                    <Image
                      src={
                        urlFor(post.author.image).width(40).height(40).url() ||
                        "/placeholder.svg"
                      }
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-400">
                    {post.author.name}
                  </span>
                </Link>
              )}
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-400">
                {post.estimatedReadingTime} min read
              </span>
            </div>
          </header>

          {post.mainImage && (
            <div className="mb-8">
              <Image
                src={
                  urlFor(post.mainImage).width(1200).height(675).url() ||
                  "/placeholder.svg"
                }
                alt={post.title}
                width={1200}
                height={675}
                className="rounded-lg object-cover w-full"
              />
            </div>
          )}

          <div className="my-auto mx-auto prose md:prose-lg prose-red max-w-none prose-invert prose-headings:text-4xl md:prose-headings:text-5xl prose-headings:mx-auto prose-headings:font-bigShoulders prose-headings:text-BrandRed prose-img:rounded-xl prose-img:shadow-2xl prose-img:min-h-full prose-img:aspect-[3:4] prose-img:mx-auto prose-img:object-fill prose-figure:mx-auto md:text-justify prose-pre:text-left prose-headings:my-5 prose-p:py-2">
            <PortableText
              value={post.body}
              components={PortableTextComponents}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href={`/article/${post.slug.current}`}
              className="text-sm text-gray-400 hover:text-BrandRed transition-colors"
            >
              View full article
            </Link>
          </div>
        </article>
      ))}

      {/* Loader reference element */}
      <div ref={loaderRef} className="h-20 flex items-center justify-center">
        {isLoading && (
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-BrandRed animate-spin" />
            <span className="text-gray-400">Loading more articles...</span>
          </div>
        )}
      </div>
    </div>
  );
}
