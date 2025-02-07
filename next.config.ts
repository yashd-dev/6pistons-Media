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

  async redirects() {
    return [
      {
        source: "/article",
        destination: "/",
        permanent: true,
      },
      {
        source: "/bookings",
        destination: "https://calendar.app.google/39dyCijPJ9tMto1E9",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
