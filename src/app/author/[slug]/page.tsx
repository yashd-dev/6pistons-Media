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

export default async function AuthorPage({ params }: { params: any }) {
  const author = await getAuthor(params.slug);

  if (!author) {
    return <div>Author not found</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-[10vh]">
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full relative z-20 px-4 py-10 md:px-28 text-foreground mx-auto gap-10">
        <div className="w-48 h-48 relative rounded-full overflow-hidden">
          <Image
            src={urlFor(author.image).width(192).height(192).url()}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="">
          <h1 className="text-3xl font-bold mb-4 font-bigShoulders text-red-500">
            {author.name}
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <PortableText value={author.bio} />
          </div>
        </div>
      </div>
      <BlogSection
        title={`Articles By ${author.name} `}
        posts={author.articles}
      />
    </div>
  );
}
