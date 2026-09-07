import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - 6Pistons Media",
  description:
    "Review the Terms of Service for 6Pistons Media. Understand user rights, editorial content terms, copyright, and disclaimers.",
  metadataBase: new URL("https://www.6pistons.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-36 sm:pt-44 lg:pt-48 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-neutral-200">
      <header className="mb-12 border-b border-white/10 pb-8">
        <p className="text-BrandRed uppercase tracking-widest text-xs font-semibold mb-2 font-mono">
          Legal & Compliance
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold font-bigShoulders tracking-tight text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-400">
          Last Updated: September 8, 2026 • Effective Date: September 8, 2026
        </p>
      </header>

      <div className="space-y-10 text-neutral-300 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or browsing <strong>6Pistons Media</strong> (the &ldquo;Site,&rdquo; located at{" "}
            <Link href="/" className="text-BrandRed hover:underline">
              https://www.6pistons.com
            </Link>
            ), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service and our Privacy Policy. If you do not agree with any portion of these terms, please discontinue use of the Site immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            2. Intellectual Property Rights
          </h2>
          <p>
            All content published on 6Pistons—including but not limited to written automotive articles, vehicle test reviews, original photography, graphic illustrations, logos, trademarks, and code—is the property of 6Pistons Media or its contributing writers and licensors, protected by international copyright and intellectual property laws.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-400">
            <li>You may view, share, and link to our articles for personal, non-commercial use.</li>
            <li>You may not scrape, republish, syndicate, or redistribute full articles or proprietary images without explicit prior written authorization from 6Pistons Media.</li>
            <li>Short excerpts (up to 75 words) may be cited provided clear attribution and a direct do-follow link to the original article on 6Pistons are included.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            3. Automotive Editorial & Safety Disclaimer
          </h2>
          <div className="p-6 rounded-2xl bg-BrandRed/10 border border-BrandRed/30 text-neutral-200">
            <p className="font-semibold text-white mb-2">Important Driving & Vehicle Advisory:</p>
            <p className="text-sm leading-relaxed text-neutral-300">
              All vehicle reviews, technical specifications, acceleration times, lap data, range calculations, and dynamic impressions published on 6Pistons are intended solely for general informational, educational, and entertainment purposes. Vehicle prices, specifications, and performance vary based on weather, driving style, production batches, and optional equipment.
            </p>
            <p className="text-sm leading-relaxed text-neutral-300 mt-2">
              6Pistons strongly advocates for responsible driving. High-speed testing and dynamic evaluations referenced in our coverage are performed under controlled conditions on closed proving grounds or professional race circuits. Never attempt reckless driving maneuvers on public highways, and always obey local motor vehicle safety laws.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            4. User Conduct
          </h2>
          <p>When interacting with the Site, you agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-400">
            <li>Use automated bots, spiders, or scrapers to extract site data or index without permission.</li>
            <li>Attempt to breach or bypass any security or authentication measures.</li>
            <li>Transmit malicious code, viruses, or spam through our contact channels.</li>
            <li>Impersonate any 6Pistons writer, editor, or representative.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            5. External Links & Third-Party Content
          </h2>
          <p>
            Our articles may include links to third-party websites, YouTube videos, automaker press portals, and social media platforms. 6Pistons Media has no control over and assumes no responsibility for the content, privacy practices, or accuracy of any third-party websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            6. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, 6Pistons Media, its founders, editors, and contributors shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from your access to or inability to access the Site, or any vehicle buying or modifying decisions made based on published reviews.
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            7. Contact & Legal Inquiries
          </h2>
          <p>
            For legal inquiries, copyright notices (DMCA), or questions about these Terms, contact:
          </p>
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 font-mono text-sm">
            <p className="text-white font-bold">6Pistons Media Legal</p>
            <p className="text-neutral-400">Email: <a href="mailto:contact@6pistons.com" className="text-BrandRed hover:underline">contact@6pistons.com</a></p>
            <p className="text-neutral-400">Website: <Link href="/" className="text-BrandRed hover:underline">www.6pistons.com</Link></p>
          </div>
        </section>
      </div>
    </div>
  );
}
