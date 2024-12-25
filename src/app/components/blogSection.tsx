"use client";

import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function BlogSection({ title, posts }: { title: string; posts: any[] }) {
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const isLineInView = useInView(lineRef, { once: true });

  return (
    <section className="flex flex-col items-start justify-start w-full h-full relative z-20 px-4 py-20 md:px-28 text-foreground mx-auto gap-10">
      <div className="flex flex-row w-full justify-between items-center ">
        <motion.h1
          ref={titleRef}
          className="md:text-xl font-bold uppercase text-BrandRed w-fit inline-flex justify-between"
          style={{
            opacity: isTitleInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          {title}{" "}
        </motion.h1>
        <Link
          href={`/article`}
          className="text-sm md:text-lg uppercase underline text-white/70 hover:text-white transition-colors duration-300 ease-in-out rounded-2xl group "
        >
          View All
        </Link>
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

export function BlogCard({
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
          <p className="text-foreground/70">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default BlogSection;
