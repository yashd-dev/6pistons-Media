import { HomeClient } from "@/app/components/heroClient";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// GROQ query to fetch the latest 3 blog posts for a specific category
const LATEST_POSTS_BY_CATEGORY_QUERY = `
  *[_type == "post" && $category in categories[]->title] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    description,
  }
`;

export default async function Home() {
  const carPosts = await client.fetch(LATEST_POSTS_BY_CATEGORY_QUERY, {
    category: "cars",
  });
  const bikePosts = await client.fetch(LATEST_POSTS_BY_CATEGORY_QUERY, {
    category: "Bikes",
  });

  return (
    <>
      <HomeClient />
      <BlogSection title="Latest Car Articles" posts={carPosts} />
      <BlogSection title="Latest Bike Articles" posts={bikePosts} />
    </>
  );
}

function BlogSection({ title, posts }: { title: string; posts: any[] }) {
  return (
    <section className="flex flex-col items-start justify-start w-full h-full relative z-20 px-4 md:p-28 text-foreground mx-auto gap-10">
      <h1 className="text-xl font-bold uppercase text-BrandRed w-full inline-flex justify-between">
        {title}{" "}
        <a
          className="text-sm text-foreground underline pl-10 hover:text-BrandRed/70"
          href="/blog"
        >
          Read More
        </a>
      </h1>
      <div className="h-1 w-full bg-BrandRed/10"></div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            href={`/article/${post.slug.current}`}
            imageSrc={urlFor(post.mainImage).width(800).height(450).url()}
            date={new Date(post.publishedAt).toLocaleDateString()}
            readTime={`${post.estimatedReadingTime} min read`}
            title={post.title}
            description={post.description}
          />
        ))}
      </div>
    </section>
  );
}

interface BlogCardProps {
  href: string;
  imageSrc: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
}

function BlogCard({
  href,
  imageSrc,
  date,
  readTime,
  title,
  description,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full overflow-hidden rounded-xl border border-foreground/20 hover:border-BrandRed/20 bg-card transition-all hover:bg-accent hover:shadow-md"
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          src={imageSrc}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          alt={title}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 text-sm text-foreground/70 mb-2">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-foreground/70">{description}</p>
      </div>
    </Link>
  );
}
