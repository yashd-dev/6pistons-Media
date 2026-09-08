"use client";

import { useState } from "react";
import { fetchPosts } from "@/app/actions/fetchPosts";
import { motion, useInView } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { HomeClient } from "./heroClient";
import { categoryToSlug } from "@/lib/slugs";

export default function AllArticles({
  initialPosts,
  totalCount,
  categories,
  initialPage,
  initialCategory,
}: {
  initialPosts: any[];
  totalCount: number;
  categories: { title: string }[];
  initialPage: number;
  initialCategory: string | null;
}) {
  const [featuredPost, setFeaturedPost] = useState(initialPosts[0]);
  const [posts, setPosts] = useState(initialPosts.slice(1));
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentCategory, setCurrentCategory] = useState(initialCategory);

  const totalPages = Math.ceil(totalCount / 9);

  const handleCategoryChange = async (category: string) => {
    const { posts: newPosts } = await fetchPosts(1, 10, category || null);
    if (newPosts.length === 0) return redirect("/");
    setPosts(newPosts.slice(1));
    setFeaturedPost(newPosts[0]);
    setCurrentPage(1);
    setCurrentCategory(category || null);
    const newUrl = `/?category=${category}`;
    window.history.pushState({ category: category }, "", newUrl);
    window.scrollTo(0, 0);
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const { posts: newPosts } = await fetchPosts(newPage, 10, currentCategory);
    if (newPosts.length === 0) return redirect("/");
    setPosts(newPosts.slice(1));
    setFeaturedPost(newPosts[0]);
    setCurrentPage(newPage);
    const newUrl = `/?page=${newPage}${currentCategory ? `&category=${currentCategory}` : ""}`;
    window.history.pushState(
      { page: newPage, category: currentCategory },
      "",
      newUrl
    );
    window.scrollTo(0, 0);
  };
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const isLineInView = useInView(lineRef, { once: true });

  return (
    <div className="w-full max-w-[90rem] 2xl:max-w-[110rem] 3xl:max-w-[130rem] mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8">
      {currentPage === 1 && (!currentCategory || currentCategory === "all") && (
        <HomeClient />
      )}
      <TitleCard featuredPost={featuredPost} />

      <section className="flex flex-col items-start justify-start w-full h-full relative z-20 px-0 sm:px-4 py-6 sm:py-10 text-foreground mx-auto gap-6 sm:gap-10">
        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-3 sm:gap-4">
          <motion.h1
            ref={titleRef}
            className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-bold uppercase text-BrandRed tracking-wide"
            style={{
              opacity: isTitleInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
          >
            Latest Articles
          </motion.h1>
          <div className="relative z-20 w-full sm:w-auto">
            <select
              id="category"
              value={currentCategory || ""}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full sm:w-auto border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm bg-neutral-900 text-white focus:outline-none focus:border-BrandRed transition-colors"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.title} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Crawlable Category Filter Badges (Internal SEO Linking) */}
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 pt-1 scrollbar-hide">
          <Link
            href="/"
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border ${
              !currentCategory
                ? "bg-BrandRed text-white border-BrandRed shadow-md shadow-BrandRed/20"
                : "bg-white/[0.03] text-neutral-300 border-white/10 hover:border-BrandRed/40 hover:text-white"
            }`}
          >
            All Articles
          </Link>
          {categories.map((cat) => {
            const slug = categoryToSlug(cat.title);
            const isActive = currentCategory === cat.title;
            return (
              <Link
                key={cat.title}
                href={`/category/${slug}`}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border ${
                  isActive
                    ? "bg-BrandRed text-white border-BrandRed shadow-md shadow-BrandRed/20"
                    : "bg-white/[0.03] text-neutral-300 border-white/10 hover:border-BrandRed/40 hover:text-white"
                }`}
              >
                {cat.title}
              </Link>
            );
          })}
        </div>

        <motion.div
          ref={lineRef}
          className="h-0.5 w-full bg-BrandRed/20"
          style={{
            opacity: isLineInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            transitionDelay: "0.2s",
          }}
        ></motion.div>
        <div className="grid gap-5 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 w-full">
          {posts.map((post) => (
            <BlogCard
              key={post._id}
              href={`/article/${post.slug.current}`}
              imageSrc={urlFor(post.mainImage).width(800).height(450).url()}
              date={new Date(post.publishedAt).toLocaleDateString()}
              readTime={`${post.estimatedReadingTime} min read`}
              title={post.title}
              description={post.description}
            />
          ))}
        </div>
      </section>

      <div className="mt-8 flex justify-center items-center space-x-4 relative z-50">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-BrandRed text-white hover:bg-BrandRed/80"
          }`}
        >
          Previous
        </button>

        <span className="text-foreground">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-BrandRed text-white hover:bg-BrandRed/80"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function TitleCard({ featuredPost }: { featuredPost: any }) {
  return (
    <Link
      href={`/article/${featuredPost.slug.current}`}
      className="w-full transition-all duration-300 ease-in-out rounded-2xl group block"
    >
      <div className="max-w-[90rem] 2xl:max-w-[110rem] 3xl:max-w-[130rem] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 lg:gap-12 py-6 sm:py-10 lg:py-14 px-0 sm:px-4">
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <Image
            src={urlFor(featuredPost.mainImage).width(800).height(600).url()}
            alt={featuredPost.title}
            width={800}
            height={600}
            className="rounded-2xl shadow-lg object-cover aspect-video w-full transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="w-full lg:w-1/2 text-left space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-foreground/70 mb-1">
            <span>
              {new Date(featuredPost.publishedAt).toLocaleDateString()}
            </span>
            <span>•</span>
            <span>{featuredPost.estimatedReadingTime} min read</span>
          </div>
          <h1 className="font-bigShoulders text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-red-500 mb-2 sm:mb-4 leading-tight">
            {featuredPost.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg 2xl:text-xl text-gray-300 lg:max-w-[60ch] leading-relaxed">
            {featuredPost.description.split(" ").slice(0, 15).join(" ")}
            {featuredPost.description.split(" ").length > 15 && " ..."}
          </p>
        </div>
      </div>
    </Link>
  );
}

interface BlogCardProps {
  href: string;
  imageSrc: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
}

function BlogCard({
  href,
  imageSrc,
  date,
  readTime,
  title,
  description,
}: BlogCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        // transitionDelay: `${index * 0.1}s`,
      }}
    >
      <Link
        href={href}
        className="group block h-full overflow-hidden rounded-xl border border-foreground/20 hover:border-BrandRed/20 bg-card transition-all hover:bg-accent hover:shadow-md"
      >
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={90}
            src={imageSrc}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            alt={title}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-2 text-sm text-foreground/70 mb-2">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-foreground/70">
            {" "}
            {description.split(" ").slice(0, 10).join(" ")}
            {description.split(" ").length > 10 && " ..."}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
