"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Youtube, ExternalLink } from "lucide-react";

interface YouTubeEmbedProps {
  url?: string;
  title: string;
  posterImage?: string;
}

export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function YouTubeEmbed({
  url,
  title,
  posterImage,
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = extractYouTubeId(url);

  // If a specific video ID is present, render the click-to-play facade
  if (videoId) {
    const thumbnail =
      posterImage || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return (
      <div className="my-10 rounded-2xl overflow-hidden border border-BrandRed/30 bg-neutral-950/80 shadow-2xl">
        <div className="p-4 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <Youtube className="w-4 h-4 text-BrandRed" />
            <span className="font-bold uppercase tracking-wider text-white">
              6Pistons Video Review
            </span>
          </div>
          <a
            href="https://www.youtube.com/@6Pistons-Media?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-BrandRed hover:bg-red-600 text-white text-xs font-bold transition-colors"
          >
            <span>Subscribe</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="relative aspect-video w-full bg-black">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play video: ${title}`}
              className="relative w-full h-full group focus:outline-none focus:ring-2 focus:ring-BrandRed cursor-pointer block"
            >
              <Image
                src={thumbnail}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 850px"
                className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-BrandRed/90 group-hover:bg-BrandRed text-white flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110 mb-3">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
                </div>
                <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">
                  Watch In-Depth Review Video
                </span>
                <span className="text-neutral-400 text-xs font-mono mt-1">
                  Click to play • 6Pistons Media
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    );
  }

  // If no video is attached to this article, render the official 6Pistons Video Desk CTA banner
  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-950 via-BrandRed/10 to-neutral-950 border border-BrandRed/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-BrandRed/20 border border-BrandRed/40 flex items-center justify-center shrink-0">
          <Youtube className="w-6 h-6 text-BrandRed" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base sm:text-lg font-bigShoulders tracking-wide uppercase">
            Watch Road Tests on 6Pistons YouTube
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Exhaust sound clips, dynamic track tests, and drag races produced by our team.
          </p>
        </div>
      </div>
      <a
        href="https://www.youtube.com/@6Pistons-Media?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-full bg-BrandRed hover:bg-red-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-BrandRed/20"
      >
        <span>Watch & Subscribe</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
