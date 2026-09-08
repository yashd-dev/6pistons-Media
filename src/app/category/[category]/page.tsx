import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Clock, Tag } from "lucide-react";
import { categoryToSlug } from "@/lib/slugs";

export const revalidate = 60; // ISR revalidation

async function getCategories() {
  return client.fetch(
    groq`*[_type == "category"] {
      title,
      description
    }`
  );
}

async function getCategoryData(slugOrTitle: string) {
  const decoded = decodeURIComponent(slugOrTitle).trim();
  const allCategories = await getCategories();

  // Find category matching by normalized slug, exact title, or lowercase title
  const matched = allCategories.find((cat: any) => {
    return (
      categoryToSlug(cat.title) === categoryToSlug(decoded) ||
      cat.title.toLowerCase() === decoded.toLowerCase()
    );
  });

  if (!matched) return null;

  const categoryTitle = matched.title;
  const canonicalSlug = categoryToSlug(categoryTitle);

  // Fetch articles belonging to this category
  const posts = await client.fetch(
    groq`*[_type == "post" && $categoryTitle in categories[]->title] | order(publishedAt desc)[0...30] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      description,
      categories[]->{ title }
    }`,
    { categoryTitle }
  );

  return {
    category: matched,
    categoryTitle,
    canonicalSlug,
    posts,
    allCategories,
  };
}

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { category: slugParam } = await params;
  const data = await getCategoryData(slugParam);

  if (!data) {
    return {
      title: "Category Not Found - 6Pistons Media",
      description: "The requested automotive category could not be found.",
    };
  }

  const { categoryTitle, canonicalSlug, category } = data;
  const title = `${categoryTitle} Articles, News & Reviews | 6Pistons Media`;
  const description =
    category.description ||
    `Browse all the latest ${categoryTitle} coverage, road tests, technical specifications, and in-depth automotive reviews on 6Pistons Media.`;
  const canonicalUrl = `https://www.6pistons.com/category/${canonicalSlug}`;

  return {
    title,
    description,
    metadataBase: new URL("https://www.6pistons.com"),
    alternates: {
      canonical: `/category/${canonicalSlug}`,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "6Pistons Media",
      images: ["https://www.6pistons.com/opengraph-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.6pistons.com/opengraph-image.png"],
    },
  };
}

export default async function CategoryPage({ params }: { params: any }) {
  const { category: slugParam } = await params;
  const data = await getCategoryData(slugParam);

  if (!data) {
    return notFound();
  }

  const { categoryTitle, canonicalSlug, category, posts, allCategories } = data;
  const canonicalUrl = `https://www.6pistons.com/category/${canonicalSlug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.6pistons.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Categories",
            item: "https://www.6pistons.com/#categories",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: categoryTitle,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": canonicalUrl,
        name: `${categoryTitle} Coverage`,
        description:
          category.description ||
          `Latest ${categoryTitle} news and road test reviews.`,
        url: canonicalUrl,
        publisher: {
          "@type": "NewsMediaOrganization",
          name: "6Pistons Media",
          url: "https://www.6pistons.com",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-neutral-200">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 mb-8"
        >
          <Link href="/" className="hover:text-BrandRed transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
          <span className="text-neutral-500">Category</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
          <span className="text-neutral-200 font-semibold">{categoryTitle}</span>
        </nav>

        {/* Category Header */}
        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-BrandRed font-semibold mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Category Archive</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-bigShoulders tracking-tight text-white mb-4">
            {categoryTitle}
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            {category.description ||
              `In-depth automotive journalism, performance testing, and road test reports covering ${categoryTitle}.`}
          </p>
          <p className="text-xs font-mono text-neutral-500 mt-3">
            Showing {posts.length} {posts.length === 1 ? "article" : "articles"} in this category
          </p>
        </header>

        {/* Category Filter Pills for Internal Linking */}
        <div className="mb-12">
          <p className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3">
            Explore Other Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat: any) => {
              const slug = categoryToSlug(cat.title);
              const isActive = cat.title === categoryTitle;
              return (
                <Link
                  key={cat.title}
                  href={`/category/${slug}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border ${
                    isActive
                      ? "bg-BrandRed text-white border-BrandRed shadow-lg shadow-BrandRed/20"
                      : "bg-white/[0.03] text-neutral-300 border-white/10 hover:border-BrandRed/40 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {cat.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {posts.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-4">
            <p className="text-neutral-400 text-sm">
              No articles currently filed under {categoryTitle}. Check back soon for new reviews.
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2.5 rounded-full bg-BrandRed hover:bg-red-600 text-white text-xs font-bold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post: any) => (
              <article
                key={post._id}
                className="group rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-BrandRed/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/article/${post.slug.current}`}
                    className="relative block aspect-[16/9] overflow-hidden bg-neutral-900"
                  >
                    {post.mainImage ? (
                      <Image
                        src={
                          urlFor(post.mainImage)
                            .width(800)
                            .height(450)
                            .url() || "/placeholder.svg"
                        }
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-700 font-mono text-xs">
                        6Pistons
                      </div>
                    )}
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-neutral-400">
                        <Clock className="w-3 h-3 text-BrandRed" />
                        {post.estimatedReadingTime || 5} min read
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-BrandRed transition-colors leading-snug mb-2 font-bigShoulders tracking-wide">
                      <Link href={`/article/${post.slug.current}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {post.description && (
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {post.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/article/${post.slug.current}`}
                    className="text-xs font-mono text-BrandRed hover:underline font-semibold flex items-center gap-1"
                  >
                    Read full review &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
