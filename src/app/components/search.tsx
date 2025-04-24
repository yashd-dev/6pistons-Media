"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, X, Loader2 } from "lucide-react";
import { searchPosts } from "@/app/actions/searchPosts";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  //   const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const { posts } = await searchPosts(query, selectedCategory);
          setResults(posts);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectedCategory]);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative z-50" ref={searchRef}>
      <button
        onClick={toggleSearch}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-md hover:bg-BrandRed/20 transition-colors duration-300"
        aria-label="Search"
      >
        <SearchIcon className="w-5 h-5 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-[-110%]  translate-x-[50%]  mt-8 w-[90vw] md:w-screen max-w-md bg-black/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="p-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search articles..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-2 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-BrandRed/50"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-3"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-white" />
                  </button>
                )}
              </div>

              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === null
                      ? "bg-BrandRed text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  All
                </button>
                {["Cars", "Bikes", "Reviews", "News"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? "bg-BrandRed text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-6 h-6 text-BrandRed animate-spin" />
                </div>
              ) : results.length > 0 ? (
                <div className="divide-y divide-white/10">
                  {results.map((post) => (
                    <Link
                      key={post._id}
                      href={`/article/${post.slug.current}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 relative flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={
                              urlFor(post.mainImage)
                                .width(100)
                                .height(100)
                                .url() || "/placeholder.svg"
                            }
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium line-clamp-1">
                            {post.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">
                              {post.estimatedReadingTime} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query.trim() !== "" ? (
                <div className="py-8 text-center text-gray-400">
                  <p>No results found for &apos;{query}&apos;</p>
                </div>
              ) : null}
            </div>

            <div className="p-3 bg-black/50 border-t border-white/10 text-xs text-gray-500 flex justify-between">
              <span>Press ESC to close</span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
