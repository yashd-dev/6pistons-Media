import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "About Us - 6Pistons Media | Professional Motor Reviews",
  description: "Learn about 6Pistons Media, your trusted source for professional motor and automotive reviews. Expert analysis, detailed insights, and comprehensive coverage.",
  metadataBase: new URL("https://www.6pistons.com"),
  keywords: ["about 6pistons", "motor review company", "automotive journalism", "car review team", "6pistons media"],
  openGraph: {
    title: "About Us - 6Pistons Media | Professional Motor Reviews",
    description: "Learn about 6Pistons Media, your trusted source for professional motor and automotive reviews. Expert analysis, detailed insights, and comprehensive coverage.",
    url: "https://www.6pistons.com/about",
    siteName: "6Pistons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - 6Pistons Media | Professional Motor Reviews",
    description: "Learn about 6Pistons Media, your trusted source for professional motor and automotive reviews. Expert analysis, detailed insights, and comprehensive coverage.",
    creator: "@6PistonsMedia",
    site: "@6PistonsMedia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
});

const aboutStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About 6Pistons Media",
  description: "Learn about 6Pistons Media, your trusted source for professional motor and automotive reviews.",
  url: "https://www.6pistons.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "6Pistons Media",
    url: "https://www.6pistons.com",
    description: "Professional motor and automotive reviews by 6Pistons Media. Expert analysis, detailed insights, and comprehensive coverage of the latest vehicles.",
    logo: "https://www.6pistons.com/logo.svg",
    sameAs: [
      "https://twitter.com/6PistonsMedia",
      "https://www.linkedin.com/company/6pistons-media/",
      "https://www.youtube.com/@6Pistons-Media",
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutStructuredData) }}
      />
      <div className="min-h-screen pt-[10vh] pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-9xl font-bold mb-8 text-BrandRed font-bigShoulders text-center">
          About Us
        </h1>
        
        <div className="prose md:prose-lg prose-red max-w-none prose-invert prose-headings:text-4xl md:prose-headings:text-5xl prose-headings:mx-auto prose-headings:font-bigShoulders prose-headings:text-BrandRed prose-img:rounded-xl prose-img:shadow-2xl prose-img:min-h-full prose-img:aspect-[3:4] prose-img:mx-auto prose-figure:mx-auto md:text-justify prose-pre:text-left prose-headings:my-5 prose-p:py-2">
          <h2>Who We Are</h2>
          <p>
            6Pistons Media is your trusted source for professional motor and automotive reviews. 
            We provide expert analysis, detailed insights, and comprehensive coverage of the latest vehicles 
            in the market. Our team of experienced automotive journalists and reviewers brings you 
            honest, thorough, and engaging content that helps you make informed decisions.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver motor reviews done right. We believe in providing our readers 
            with accurate, unbiased, and comprehensive information about vehicles, helping them understand 
            not just what a car is, but what it means to own and drive it.
          </p>
          
          <h2>What We Do</h2>
          <p>
            We specialize in detailed vehicle reviews, performance analysis, and automotive journalism. 
            Our content covers everything from luxury sports cars to practical family vehicles, 
            ensuring there's something for every automotive enthusiast.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            Have questions or want to work with us? Reach out to us at{" "}
            <a href="mailto:contact@6pistons.com" className="text-BrandRed hover:underline">
              contact@6pistons.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}