import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostNavigation from "@/app/components/post-navigation";
import { fetchAdjacentPosts } from "@/app/actions/fetchAdjacentPosts";
import { Check, X as XIcon, Clock, Share2, ShieldCheck, ChevronRight } from "lucide-react";
import YouTubeEmbed, { extractYouTubeId } from "@/app/components/youtubeEmbed";
import { categoryToSlug } from "@/lib/slugs";

export const revalidate = 60; // ISR revalidation

// Extended GROQ query to fetch post with reading time, rating, pros, cons, and FAQs
const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    description,
    keywords,
    slug,
    mainImage,
    publishedAt,
    _updatedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    author->{name, image, slug},
    categories[]->{title},
    body,
    youtubeUrl,
    rating,
    pros,
    cons,
    faqs
  }
`;

const RELATED_POSTS_QUERY = `
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt
  }
`;

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    return {
      title: "Article Not Found - 6Pistons",
      description: "The requested article could not be found.",
    };
  }

  const title = `${post.title} | 6Pistons Media`;
  const description =
    post.description ||
    `Read our in-depth road test and review of the ${post.title} on 6Pistons Media. Real-world performance, specs, and verdict.`;
  const canonicalUrl = `https://www.6pistons.com/article/${post.slug.current}`;
  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(675).format("webp").quality(85).url()
    : "https://www.6pistons.com/opengraph-image.png";

  return {
    title,
    description,
    metadataBase: new URL("https://www.6pistons.com"),
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: post.keywords || [
      "automotive reviews",
      "car review",
      "road test",
      "6Pistons",
      post.title,
    ],
    authors: [{ name: post.author?.name || "6Pistons Media" }],
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
      url: canonicalUrl,
      siteName: "6Pistons Media",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      authors: [post.author?.name || "6Pistons Media"],
      section: post.categories?.[0]?.title || "Automotive",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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
  };
}

export default async function BlogPost({ params }: { params: any }) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    client.fetch(POST_QUERY, { slug }),
    client.fetch(RELATED_POSTS_QUERY, { slug }).catch(() => []),
  ]);

  if (!post) {
    return notFound();
  }

  const { previousPost, nextPost } = await fetchAdjacentPosts(slug);
  const articleUrl = `https://www.6pistons.com/article/${post.slug.current}`;
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(675).format("webp").quality(85).url()
    : "https://www.6pistons.com/opengraph-image.png";

  const isReview =
    Boolean(post.rating) ||
    post.title?.toLowerCase().includes("review") ||
    post.title?.toLowerCase().includes("drive") ||
    post.title?.toLowerCase().includes("test");

  // Advanced Schema Graph: BreadcrumbList + NewsArticle + Review + FAQPage
  const schemas: any[] = [
    {
      "@type": "BreadcrumbList",
      "@id": `${articleUrl}#breadcrumb`,
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
          name: "Articles",
          item: "https://www.6pistons.com/article",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: articleUrl,
        },
      ],
    },
    {
      "@type": "NewsArticle",
      "@id": `${articleUrl}#article`,
      headline: post.title,
      description: post.description,
      image: [imageUrl],
      datePublished: post.publishedAt,
      dateModified: post._updatedAt || post.publishedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      author: {
        "@type": "Person",
        name: post.author?.name || "6Pistons Media",
        url: post.author?.slug
          ? `https://www.6pistons.com/author/${post.author.slug.current}`
          : "https://www.6pistons.com/about",
        jobTitle: "Automotive Journalist & Road Tester",
        knowsAbout: [
          "Automotive Reviews",
          "Electric Vehicles",
          "Performance Testing",
          "Motorcycles",
        ],
      },
      publisher: {
        "@type": "NewsMediaOrganization",
        name: "6Pistons Media",
        url: "https://www.6pistons.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.6pistons.com/logo.svg",
          width: "112",
          height: "112",
        },
        publishingPrinciples: "https://www.6pistons.com/editorial-guidelines",
      },
    },
  ];

  if (isReview && post.rating) {
    schemas.push({
      "@type": "Review",
      "@id": `${articleUrl}#review`,
      itemReviewed: {
        "@type": "Car",
        name: post.title,
        image: imageUrl,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: post.rating.toString(),
        bestRating: "10",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: post.author?.name || "6Pistons Media",
      },
      publisher: {
        "@type": "Organization",
        name: "6Pistons Media",
      },
    });
  }

  if (post.faqs && post.faqs.length > 0) {
    schemas.push({
      "@type": "FAQPage",
      "@id": `${articleUrl}#faq`,
      mainEntity: post.faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  const videoId = extractYouTubeId(post.youtubeUrl);
  if (videoId) {
    schemas.push({
      "@type": "VideoObject",
      "@id": `${articleUrl}#video`,
      name: `${post.title} - Video Review & Road Test`,
      description:
        post.description ||
        `Watch 6Pistons Media road test and performance review of the ${post.title}`,
      thumbnailUrl: [
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        imageUrl,
      ],
      uploadDate: post.publishedAt,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": schemas,
  };

  const PortableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => {
        const altText =
          value.alt ||
          value.caption ||
          `${post.title} - ${post.categories?.[0]?.title || "Automotive"} Road Test & Performance Review`;
        return (
          <figure className="my-8">
            <Image
              src={urlFor(value).width(1200).fit("max").url() || "/placeholder.svg"}
              alt={altText}
              width={1200}
              height={675}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 850px"
              className="rounded-xl object-cover w-full shadow-lg"
            />
            {(value.caption || value.alt) && (
              <figcaption className="text-center text-xs text-neutral-400 mt-2 font-mono">
                {value.caption || value.alt}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-neutral-200">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap"
        >
          <Link href="/" className="hover:text-BrandRed transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
          <Link href="/article" className="hover:text-BrandRed transition-colors">
            Articles
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
          <span className="text-neutral-300 truncate max-w-[280px] sm:max-w-md">
            {post.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 justify-between items-start">
          {/* Main Article Column */}
          <article className="lg:w-[70%] w-full">
            <header className="mb-8">
              {/* Category and Reading Time Tag Line */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.categories?.[0]?.title && (
                  <Link
                    href={`/category/${categoryToSlug(post.categories[0].title)}`}
                    className="px-3 py-1 rounded-full bg-BrandRed/10 hover:bg-BrandRed/20 text-BrandRed font-mono text-xs font-semibold uppercase tracking-wider border border-BrandRed/20 transition-colors"
                  >
                    {post.categories[0].title}
                  </Link>
                )}
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-BrandRed" />
                  <span>{post.estimatedReadingTime ? `${post.estimatedReadingTime} min read` : "5 min read"}</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-bigShoulders tracking-tight text-white mb-6 leading-[1.05]">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed mb-6">
                  {post.description}
                </p>
              )}

              {/* Author Byline & E-E-A-T Testing Disclosure */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {post.author && (
                    <Link
                      href={`/author/${post.author.slug.current}`}
                      className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0 bg-neutral-800"
                    >
                      {post.author.image ? (
                        <Image
                          src={urlFor(post.author.image).width(88).height(88).url() || "/placeholder.svg"}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
                          {post.author.name?.charAt(0)}
                        </div>
                      )}
                    </Link>
                  )}
                  <div>
                    {post.author && (
                      <Link
                        href={`/author/${post.author.slug.current}`}
                        className="font-bold text-sm text-white hover:text-BrandRed transition-colors block"
                      >
                        {post.author.name}
                      </Link>
                    )}
                    <p className="text-xs text-neutral-400 font-mono">
                      Published {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-BrandRed shrink-0" />
                  <span>
                    Tested under{" "}
                    <Link href="/editorial-guidelines" className="text-BrandRed hover:underline">
                      Editorial Guidelines
                    </Link>
                  </span>
                </div>
              </div>
            </header>

            {/* Optimized LCP Hero Image */}
            {post.mainImage && (
              <div className="relative w-full aspect-[16/9] mb-10 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <Image
                  src={
                    urlFor(post.mainImage)
                      .width(1200)
                      .height(675)
                      .format("webp")
                      .quality(85)
                      .url() || "/placeholder.svg"
                  }
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 850px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Review Scorecard (Pros / Cons / Rating if available) */}
            {(post.rating || post.pros?.length > 0 || post.cons?.length > 0) && (
              <section className="mb-10 p-6 sm:p-8 rounded-2xl bg-neutral-950/70 border border-BrandRed/30 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold font-bigShoulders tracking-wide text-white uppercase">
                      6Pistons Review Verdict
                    </h2>
                    <p className="text-xs text-neutral-400 font-mono">
                      Performance, dynamics, and ownership score
                    </p>
                  </div>
                  {post.rating && (
                    <div className="text-center px-4 py-2 rounded-xl bg-BrandRed text-white">
                      <span className="text-2xl sm:text-3xl font-bold font-bigShoulders">
                        {post.rating}
                      </span>
                      <span className="text-xs block font-mono">/ 10</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {post.pros?.length > 0 && (
                    <div>
                      <h3 className="text-xs font-mono uppercase text-green-400 font-bold mb-3 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-green-400" /> The Good (Pros)
                      </h3>
                      <ul className="space-y-2 text-sm text-neutral-300">
                        {post.pros.map((pro: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {post.cons?.length > 0 && (
                    <div>
                      <h3 className="text-xs font-mono uppercase text-red-400 font-bold mb-3 flex items-center gap-1.5">
                        <XIcon className="w-4 h-4 text-red-400" /> The Bad (Cons)
                      </h3>
                      <ul className="space-y-2 text-sm text-neutral-300">
                        {post.cons.map((con: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Video Review Embed & Conversion Module */}
            <YouTubeEmbed
              url={post.youtubeUrl}
              title={post.title}
              posterImage={imageUrl}
            />

            {/* Article Body Content */}
            <div className="prose md:prose-lg prose-red max-w-none prose-invert prose-headings:font-bigShoulders prose-headings:tracking-wide prose-headings:text-BrandRed prose-img:rounded-xl prose-img:shadow-2xl md:text-justify prose-p:leading-relaxed prose-p:py-2">
              <PortableText value={post.body} components={PortableTextComponents} />
            </div>

            {/* Optional FAQ Section (Featured Snippets Dominance) */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="my-12 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <h2 className="text-3xl font-bold font-bigShoulders tracking-wide uppercase text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {post.faqs.map((faq: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5">
                      <h3 className="font-bold text-base text-white mb-2">{faq.question}</h3>
                      <p className="text-neutral-300 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Post Navigation */}
            <div className="mt-12">
              <PostNavigation previousPost={previousPost} nextPost={nextPost} />
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:w-[28%] w-full">
            <div className="sticky top-28 space-y-8">
              {/* Author Profile Card */}
              {post.author && (
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-4">
                    Written By
                  </h3>
                  <Link
                    href={`/author/${post.author.slug.current}`}
                    className="flex items-center gap-3 mb-3 group"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0 bg-neutral-800">
                      {post.author.image ? (
                        <Image
                          src={urlFor(post.author.image).width(96).height(96).url() || "/placeholder.svg"}
                          alt={post.author.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-white">
                          {post.author.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white group-hover:text-BrandRed transition-colors">
                        {post.author.name}
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono">
                        Automotive Road Tester
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={`/author/${post.author.slug.current}`}
                    className="text-xs font-mono text-BrandRed hover:underline block mt-2"
                  >
                    View author archive &rarr;
                  </Link>
                </div>
              )}

              {/* Clickable Tags / Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3">
                    Article Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((cat: any) => (
                      <Link
                        key={cat.title}
                        href={`/category/${categoryToSlug(cat.title)}`}
                        className="px-3 py-1 rounded-full bg-black/50 text-neutral-300 hover:text-white hover:bg-BrandRed/20 border border-white/10 text-xs font-mono transition-all"
                      >
                        #{cat.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Sharing */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-BrandRed" /> Share Article
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                      `Check out: ${post.title}`
                    )}&url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/50 border border-white/10 hover:border-BrandRed text-neutral-300 hover:text-white transition-all"
                    title="Share on X"
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M9.333 6.929L14.544 1H13.31L8.784 6.143L5.17 1H1L6.463 8.789L1 15H2.235L7.009 9.575L10.829 15H15L9.333 6.929ZM7.633 8.867L7.079 8.092L2.678 1.932H4.575L8.127 6.903L8.681 7.679L13.31 14.158H11.413L7.633 8.867Z" />
                    </svg>
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${post.title} - ${articleUrl}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/50 border border-white/10 hover:border-green-500 text-green-400 transition-all"
                    title="Share on WhatsApp"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Recommended / Related Stories */}
              {relatedPosts && relatedPosts.length > 0 && (
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-4">
                    Latest & Related
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((rel: any) => (
                      <Link
                        key={rel._id}
                        href={`/article/${rel.slug.current}`}
                        className="group flex gap-3 items-center"
                      >
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-neutral-800">
                          {rel.mainImage ? (
                            <Image
                              src={
                                urlFor(rel.mainImage)
                                  .width(128)
                                  .height(96)
                                  .format("webp")
                                  .quality(75)
                                  .url() || "/placeholder.svg"
                              }
                              alt={rel.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full bg-neutral-800" />
                          )}
                        </div>
                        <h4 className="text-xs font-medium text-neutral-300 group-hover:text-BrandRed transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
