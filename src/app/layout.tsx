import type React from "react";
import type { Metadata } from "next";
import { Big_Shoulders_Display, Hanken_Grotesk } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";
import "./styles/scrollbar-hide.css"; // Import the scrollbar hiding styles
import Script from "next/script";
import Footer from "./components/footer";
export const dynamic = "force-dynamic";
export const revalidate = 10;
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const bigShouldersDisplay = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-big-shoulders-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "6Pistons - Motor Reviews Done Right",
  description: "Professional motor and automotive reviews by 6Pistons Media. Expert analysis, detailed insights, and comprehensive coverage of the latest vehicles.",
  metadataBase: new URL("https://www.6pistons.com"),
  applicationName: "6Pistons",
  alternates: {
    canonical: "https://www.6pistons.com",
    types: {
      "application/rss+xml": "https://www.6pistons.com/feed.xml",
    },
  },
  authors: [{ name: "6Pistons Media", url: "https://www.6pistons.com" }],
  keywords: ["motor reviews", "car reviews", "automotive", "6Pistons", "6 Pistons", "vehicle reviews", "car analysis", "automotive journalism"],
  openGraph: {
    title: "6Pistons - Motor Reviews Done Right",
    description: "Professional motor and automotive reviews by 6Pistons Media. Expert analysis, detailed insights, and comprehensive coverage of the latest vehicles.",
    images: "https://www.6pistons.com/opengraph-image.png",
    url: `https://www.6pistons.com/`,
    type: "website",
    siteName: "6Pistons",
  },
  twitter: {
    card: "summary_large_image",
    title: "6Pistons - Motor Reviews Done Right",
    description: "Professional motor and automotive reviews by 6Pistons Media. Expert analysis, detailed insights, and comprehensive coverage of the latest vehicles.",
    images: "https://www.6pistons.com/opengraph-image.png",
    creator: "@6PistonsMedia",
    site: "@6PistonsMedia",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large" as const,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NewsMediaOrganization",
      "@id": "https://www.6pistons.com/#organization",
      name: "6Pistons Media",
      alternateName: "6Pistons",
      url: "https://www.6pistons.com",
      description:
        "Professional motor and automotive reviews by 6Pistons Media. Expert analysis, detailed insights, and comprehensive coverage of the latest vehicles.",
      logo: {
        "@type": "ImageObject",
        url: "https://www.6pistons.com/logo.svg",
        width: 1704,
        height: 457,
      },
      image: "https://www.6pistons.com/opengraph-image.png",
      sameAs: [
        "https://x.com/6pistonsmedia",
        "https://www.linkedin.com/company/6pistons-media/",
        "https://www.youtube.com/@6Pistons-Media",
      ],
      publishingPrinciples: "https://www.6pistons.com/editorial-guidelines",
      knowsAbout: [
        "Car Reviews",
        "Motorcycle Reviews",
        "Electric Vehicles",
        "Automotive Journalism",
        "Aviation",
        "Performance Testing",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.6pistons.com/#website",
      name: "6Pistons",
      alternateName: "6Pistons Media",
      url: "https://www.6pistons.com",
      publisher: {
        "@id": "https://www.6pistons.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://www.6pistons.com/?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="78106722-fc0d-4a3d-b559-0bf289f72e23"
      />
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="a304f0ba-9013-4b81-a19a-b0ed693527e3"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <body
        className={`${hankenGrotesk.style} ${bigShouldersDisplay.variable} antialiased h-full w-full relative`}
      >
        <div className="fixed inset-0 bg-background z-20 bg-[url('/noise.png')] bg-[length:50px_50px] bg-[0_0] " />

        <Navbar></Navbar>
        <section className="relative z-20">{children}</section>
        <Footer></Footer>
      </body>
      <script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="fiUkAbORwLnOPzSSyUL5FQ"
        async
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        var ahrefs_analytics_script = document.createElement('script');
        ahrefs_analytics_script.async = true; ahrefs_analytics_script.src =
        'https://analytics.ahrefs.com/analytics.js';
        ahrefs_analytics_script.setAttribute('data-key',
        'fiUkAbORwLnOPzSSyUL5FQ');
        document.getElementsByTagName('head')[0].appendChild(ahrefs_analytics_script);
      `,
        }}
      />
    </html>
  );
}
