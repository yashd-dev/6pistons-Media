import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// GROQ query to fetch a single blog post by slug
const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    description,
    keywords,
    slug,
    mainImage,
    publishedAt,
    author->{name, image, slug},
    categories[]->{title},
    body
  }
`;
export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });
  console.log(post.keywords);
  return {
    title: post.title || "6Pistons",
    description: post.description || "Motor Reviews Done Right",
    metadataBase: new URL(`https://6pistons.com/article/${post.slug.current}`),
    keywords: post.keywords,
    openGraph: {
      title: post.title || "Product Page",
      description: post.description || "Discover more about this product.",
      images:
        urlFor(post.mainImage).width(1200).height(675).url() ||
        "https://6pistons.com/opengraph-image.png",
      url: `https://6pistons.com/article/${post.slug.current}`,
      site_name: "6Pistons",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title || "Product Page",
      description: post.description || "Discover more about this product.",
      images:
        urlFor(post.mainImage).width(1200).height(675).url() ||
        "https://6pistons.com/opengraph-image.png",
      creator: "@6PistonsMedia",
    },
  };
}

export default async function BlogPost({ params }: { params: any }) {
  function getFullUrl(slug: string) {
    return `https://6pistons.com/article/${slug}`;
  }
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });
  // const featuredPosts = await client.fetch(FEATURED_POSTS_QUERY);

  if (!post) {
    return notFound();
  }
  const PortableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).width(800).height(450).url()}
          alt={value.alt || ""}
          width={800}
          height={450}
          className="rounded-lg object-cover w-full"
        />
      ),
    },
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 pt-[10vh] md:py-12 justify-between relative z-20">
        <article className="lg:w-[70%]">
          <header className="mb-8">
            <h1 className="text-5xl md:text-9xl font-bold mb-4 text-BrandRed font-bigShoulders text-center ">
              {post.title}
            </h1>
          </header>
          {post.mainImage && (
            <div className="mb-8">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                alt={post.title}
                width={1200}
                height={675}
                className="rounded-lg object-cover w-full"
              />
            </div>
          )}
          <div className="my-auto mx-auto prose  md:prose-lg prose-red max-w-none  prose-invert prose-headings:text-4xl md:prose-headings:text-5xl prose-headings:mx-auto  prose-headings:font-bigShoulders prose-headings:text-BrandRed  prose-img:rounded-xl prose-img:shadow-2xl  prose-img:min-h-full prose-img:aspect-[3:4] prose-img:mx-auto prose-img:object-fill  prose-figure:mx-auto md:text-justify prose-pre:text-left prose-headings:my-5 prose-p:py-2">
            <PortableText
              value={post.body}
              components={PortableTextComponents}
            />
          </div>
        </article>
        <aside className="lg:w-fit">
          <div className="sticky top-1/3 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-5 block">Written by</h2>
              {post.author && (
                <Link href={`/author/${post.author.slug.current}`}>
                  <div className="flex items-center space-x-4 mb-4">
                    {post.author && post.author.image && (
                      <Image
                        src={urlFor(post.author.image)
                          .width(40)
                          .height(40)
                          .url()}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      {post.author && (
                        <p className="font-semibold">{post.author.name}</p>
                      )}
                      <p className="text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                    </div>{" "}
                  </div>
                </Link>
              )}
            </div>
            <div>
              {/* <h2 className="text-xl font-bold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {post.categories?.map((category: { title: string }) => (
              <span
                key={category.title}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {category.title}
              </span>
            ))}
          </div> */}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Share</h2>
              <div className="flex space-x-4">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out this article: ${post.title} - ${getFullUrl(post.slug.current)}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
                {/* <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getFullUrl(post.slug.current))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a> */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this article: ${post.title}`)}&url=${encodeURIComponent(getFullUrl(post.slug.current))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
            {/* <div>
          <h2 className="text-xl font-bold mb-4">Featured Articles</h2>
          <div className="space-y-4">
            {featuredPosts.map((featuredPost: any) => (
              <Link
                href={`/article/${featuredPost.slug.current}`}
                key={featuredPost._id}
                className="block group"
              >
                <div className="aspect-video relative overflow-hidden rounded-lg mb-2">
                  <Image
                    src={urlFor(featuredPost.mainImage)
                      .width(400)
                      .height(225)
                      .url()}
                    alt={featuredPost.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
              </Link>
            ))}
          </div>
        </div> */}
          </div>
        </aside>
      </div>
    </>
  );
}
