"use client"

import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage: any
  publishedAt: string
  description: string
}

interface PostNavigationProps {
  previousPost: Post | null
  nextPost: Post | null
}

export default function PostNavigation({ previousPost, nextPost }: PostNavigationProps) {
  return (
    <div className="border-t border-white/10 mt-16 pt-8">
      <h2 className="text-xl font-bold mb-6 text-center">Continue Reading</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {previousPost && (
          <Link href={`/article/${previousPost.slug.current}`} className="group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col h-full overflow-hidden rounded-xl border border-white/10 bg-black/30 hover:bg-black/50 transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <Image
                  src={urlFor(previousPost.mainImage).width(600).height(300).url() || "/placeholder.svg"}
                  alt={previousPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-BrandRed/80 text-white px-3 py-1 rounded-full text-xs flex items-center z-20">
                  <ArrowLeft className="w-3 h-3 mr-1" />
                  Previous
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-BrandRed transition-colors">
                  {previousPost.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 flex-1">{previousPost.description}</p>
                <div className="mt-3 text-xs text-gray-500">
                  {new Date(previousPost.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        {nextPost && (
          <Link href={`/article/${nextPost.slug.current}`} className="group">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col h-full overflow-hidden rounded-xl border border-white/10 bg-black/30 hover:bg-black/50 transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <Image
                  src={urlFor(nextPost.mainImage).width(600).height(300).url() || "/placeholder.svg"}
                  alt={nextPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-BrandRed/80 text-white px-3 py-1 rounded-full text-xs flex items-center z-20">
                  Next
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-BrandRed transition-colors">
                  {nextPost.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 flex-1">{nextPost.description}</p>
                <div className="mt-3 text-xs text-gray-500">{new Date(nextPost.publishedAt).toLocaleDateString()}</div>
              </div>
            </motion.div>
          </Link>
        )}
      </div>
    </div>
  )
}
