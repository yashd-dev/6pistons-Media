import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";

export const revalidate = 60; // Revalidate every minute

export const generateMetadata = (): Metadata => ({
  title: "About Us & Editorial Team - 6Pistons Media",
  description:
    "Meet the passionate automotive journalists, road testers, and creators behind 6Pistons Media. Learn about our mission, our standards, and our team.",
  metadataBase: new URL("https://www.6pistons.com"),
  alternates: {
    canonical: "https://www.6pistons.com/about",
  },
  keywords: [
    "about 6pistons",
    "automotive journalists",
    "car review team",
    "6pistons media team",
    "motor reviews",
    "editorial team",
  ],
  openGraph: {
    title: "About Us & Editorial Team - 6Pistons Media",
    description:
      "Meet the passionate automotive journalists, road testers, and creators behind 6Pistons Media. Learn about our mission, our standards, and our team.",
    url: "https://www.6pistons.com/about",
    siteName: "6Pistons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us & Editorial Team - 6Pistons Media",
    description:
      "Meet the passionate automotive journalists, road testers, and creators behind 6Pistons Media. Learn about our mission, our standards, and our team.",
    creator: "@6PistonsMedia",
    site: "@6PistonsMedia",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large" as const,
    "max-video-preview": -1,
  },
});

interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image?: any;
  bio?: any;
}

const AUTHORS_QUERY = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio
  }
`;

export default async function AboutPage() {
  const authors: Author[] = await client.fetch(AUTHORS_QUERY).catch(() => []);

  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://www.6pistons.com/about#aboutpage",
        name: "About 6Pistons Media & Editorial Team",
        description:
          "Meet the passionate automotive journalists, road testers, and creators behind 6Pistons Media.",
        url: "https://www.6pistons.com/about",
        mainEntity: {
          "@id": "https://www.6pistons.com/about#organization",
        },
      },
      {
        "@type": "NewsMediaOrganization",
        "@id": "https://www.6pistons.com/about#organization",
        name: "6Pistons Media",
        alternateName: "6Pistons",
        url: "https://www.6pistons.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.6pistons.com/logo.svg",
          width: 1704,
          height: 457,
        },
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
        member: authors.map((author) => ({
          "@type": "Person",
          name: author.name,
          url: author.slug?.current
            ? `https://www.6pistons.com/author/${author.slug.current}`
            : undefined,
          jobTitle: "Automotive Journalist & Road Tester",
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutStructuredData) }}
      />
      <div className="min-h-screen pt-36 sm:pt-44 lg:pt-48 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-white">
        {/* Hero Section */}
        <header className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-BrandRed/10 border border-BrandRed/20 text-BrandRed uppercase tracking-widest text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-BrandRed animate-pulse" />
            Brand Led by Enthusiasts
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold font-bigShoulders tracking-tight text-white mb-6 uppercase">
            Meet the 6Pistons Team
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
            We are road testers, automotive engineers, track racers, and die-hard motor enthusiasts dedicated to delivering honest, unfiltered car and motorcycle journalism.
          </p>
        </header>

        {/* Mission & Values Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-BrandRed/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-BrandRed/10 text-BrandRed flex items-center justify-center font-bold font-mono mb-4 text-lg">
              01
            </div>
            <h2 className="text-xl font-bold mb-2">Unfiltered Reviews</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Real-world road testing focused on handling, power delivery, design, and practicality. No PR fluff.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-BrandRed/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-BrandRed/10 text-BrandRed flex items-center justify-center font-bold font-mono mb-4 text-lg">
              02
            </div>
            <h2 className="text-xl font-bold mb-2">Technical Depth</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Our writers include engineers and racers who understand chassis dynamics, software architecture, and powertrain mechanics.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-BrandRed/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-BrandRed/10 text-BrandRed flex items-center justify-center font-bold font-mono mb-4 text-lg">
              03
            </div>
            <h2 className="text-xl font-bold mb-2">Actionable Advice</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Helping buyers and collectors make the right vehicle decisions with comprehensive comparisons and ownership insights.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-bigShoulders tracking-wide text-white uppercase">
                The Editorial Masthead
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                The voices and road testers shaping automotive culture at 6Pistons.
              </p>
            </div>
            <span className="text-xs font-mono text-BrandRed uppercase tracking-wider px-3 py-1 rounded-full bg-BrandRed/10 border border-BrandRed/20 w-fit">
              {authors.length} Editorial Members
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <div
                key={author._id}
                className="group relative flex flex-col p-6 rounded-2xl bg-neutral-950/60 border border-white/10 hover:border-BrandRed/40 transition-all duration-300 hover:shadow-xl hover:shadow-BrandRed/5"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-BrandRed transition-colors shrink-0 bg-neutral-800">
                    {author.image ? (
                      <Image
                        src={urlFor(author.image).width(160).height(160).url()}
                        alt={author.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/50 font-bold text-lg font-mono">
                        {author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-BrandRed transition-colors">
                      {author.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      Automotive Contributor
                    </p>
                  </div>
                </div>

                <div className="text-sm text-neutral-400 leading-relaxed mb-6 flex-1 line-clamp-4">
                  {author.bio ? (
                    <PortableText value={author.bio} />
                  ) : (
                    <p className="italic text-neutral-500">
                      Editorial writer and motoring enthusiast at 6Pistons Media.
                    </p>
                  )}
                </div>

                {author.slug?.current && (
                  <Link
                    href={`/author/${author.slug.current}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-BrandRed hover:text-white transition-colors mt-auto pt-4 border-t border-white/5"
                  >
                    View Published Articles
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-BrandRed/20 via-black to-neutral-900 border border-BrandRed/30 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-bigShoulders tracking-wide mb-3">
            Want to Join the Team or Pitch a Story?
          </h2>
          <p className="text-neutral-300 max-w-xl mx-auto text-sm sm:text-base mb-6">
            We are always looking for passionate automotive photographers, road testers, and investigative writers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-BrandRed hover:bg-red-600 text-white font-medium text-sm transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/editorial-guidelines"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/10"
            >
              Our Editorial Standards
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}