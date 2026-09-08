import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import Image from "next/image";
import BlogSection from "@/app/components/blogSection";

async function getAuthor(slug: string) {
  return client.fetch(
    groq`*[_type == "author" && slug.current == $slug][0]{
      name,
      "slug": slug.current,
      image,
      bio,
      "articles": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
        description
      }
    }`,
    { slug }
  );
}

import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) {
    return {
      title: "Author Not Found - 6Pistons Media",
      description: "The requested author profile could not be found.",
    };
  }

  const title = `${author.name} - Motoring Journalist & Writer Archive | 6Pistons Media`;
  const description =
    `Read all automotive reviews, car road tests, and feature articles by ${author.name} on 6Pistons Media.`;
  const canonicalUrl = `https://www.6pistons.com/author/${slug}`;
  const authorImg = author.image
    ? urlFor(author.image).width(800).height(800).url()
    : "https://www.6pistons.com/opengraph-image.png";

  return {
    title,
    description,
    metadataBase: new URL("https://www.6pistons.com"),
    alternates: {
      canonical: `/author/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "profile",
      images: [{ url: authorImg, width: 800, height: 800, alt: author.name }],
      siteName: "6Pistons Media",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [authorImg],
    },
  };
}

export default async function AuthorPage({ params }: { params: any }) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) {
    return <div className="min-h-[50vh] flex items-center justify-center text-white">Author not found</div>;
  }
  const authorImage = author.image ? urlFor(author.image).width(256).height(256).url() : "/logo.svg";

  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      url: `https://www.6pistons.com/author/${author.slug}`,
      image: authorImage,
      jobTitle: "Automotive Journalist & Road Tester",
      worksFor: {
        "@type": "NewsMediaOrganization",
        name: "6Pistons Media",
        url: "https://www.6pistons.com",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <div className="container mx-auto px-4 pt-[10vh]">
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full relative z-20 px-4 py-10 md:px-28 text-foreground mx-auto gap-10">
        <div className="w-48 h-48 relative rounded-full overflow-hidden">
          <Image
            src={authorImage}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="">
          <h1 className="text-3xl font-bold mb-4 font-bigShoulders text-red-500">
            {author.name}
          </h1>
          <div className="prose dark:prose-invert max-w-xl">
            <PortableText value={author.bio} />
          </div>
        </div>
      </div>
      <BlogSection
        title={`Articles By ${author.name} `}
        posts={author.articles}
      />
    </div>
    </>
  );
}
