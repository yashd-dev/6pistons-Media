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
    <div className="w-full max-w-[90rem] mx-auto px-4 py-8">
      {currentPage === 1 && (!currentCategory || currentCategory === "all") && (
        <HomeClient />
      )}
      <TitleCard featuredPost={featuredPost} />

      <section className="flex flex-col items-start justify-start w-full h-full relative z-20 px-4 py-10  text-foreground mx-auto gap-10">
        <div className="flex flex-row w-full justify-between items-center ">
          <motion.h1
            ref={titleRef}
            className="md:text-xl font-bold uppercase text-BrandRed w-full inline-flex justify-between"
            style={{
              opacity: isTitleInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
          >
            Latest Articles
          </motion.h1>
          <div className="mb-8 relative z-20">
            <select
              id="category"
              value={currentCategory || ""}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border border-white/20 rounded p-2 bg-neutral-900"
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

        <motion.div
          ref={lineRef}
          className="h-1 w-full bg-BrandRed/10"
          style={{
            opacity: isLineInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            transitionDelay: "0.2s",
          }}
        ></motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
      className="w-full transition-all duration-300 ease-in-out rounded-2xl group "
    >
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 py-12 px-4 md:px-0 pt-[10vh]">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <Image
            src={urlFor(featuredPost.mainImage).width(800).height(600).url()}
            alt={featuredPost.title}
            width={800}
            height={600}
            className="rounded-2xl shadow-lg object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="w-full md:w-1/2 md:text-left space-y-4">
          <div className="flex items-center space-x-2 text-sm text-foreground/70 mb-2">
            <span>
              {new Date(featuredPost.publishedAt).toLocaleDateString()}
            </span>
            <span>•</span>
            <span>{featuredPost.estimatedReadingTime} min read</span>
          </div>
          <h1 className=" font-bigShoulders text-4xl md:text-5xl font-bold text-red-500 mb-4">
            {featuredPost.title}
          </h1>
          <p className="text-lg text-gray-300 md:max-w-[60ch] ">
            {featuredPost.description.split(" ").slice(0, 10).join(" ")}
            {featuredPost.description.split(" ").length > 10 && " ..."}
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
