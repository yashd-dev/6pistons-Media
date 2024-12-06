import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      { hostname: "www.google.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
