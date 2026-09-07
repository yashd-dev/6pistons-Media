import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - 6Pistons Media",
  description:
    "Read the 6Pistons Media Privacy Policy. Understand how we collect, use, and protect your information in compliance with Google AdSense, GDPR, and CCPA standards.",
  metadataBase: new URL("https://www.6pistons.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-36 sm:pt-44 lg:pt-48 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-neutral-200">
      <header className="mb-12 border-b border-white/10 pb-8">
        <p className="text-BrandRed uppercase tracking-widest text-xs font-semibold mb-2 font-mono">
          Legal & Compliance
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold font-bigShoulders tracking-tight text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-400">
          Last Updated: September 8, 2026 • Effective Date: September 8, 2026
        </p>
      </header>

      <div className="space-y-10 text-neutral-300 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            1. Introduction
          </h2>
          <p>
            Welcome to <strong>6Pistons Media</strong> (&ldquo;6Pistons,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), accessible at{" "}
            <Link href="/" className="text-BrandRed hover:underline">
              https://www.6pistons.com
            </Link>
            . We are committed to protecting your personal data and respecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you visit our website, read our automotive reviews, or interact with our content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            2. Information We Collect
          </h2>
          <p>We collect information in the following ways:</p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-400">
            <li>
              <strong className="text-white">Log Data:</strong> Like most media publications, we automatically log information when you access our site, including your Internet Protocol (IP) address, browser type, operating system, referring URLs, access timestamps, and pages viewed.
            </li>
            <li>
              <strong className="text-white">Voluntary Inquiries:</strong> If you contact us via email or our contact forms (for editorial pitches, press releases, or general feedback), we collect your name, email address, and the contents of your message.
            </li>
            <li>
              <strong className="text-white">Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and device identifiers to optimize page performance, remember user preferences, and analyze readership trends.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            3. Google AdSense & Third-Party Advertising
          </h2>
          <p>
            We may partner with third-party advertising companies, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-400">
            <li>
              Google, as a third-party vendor, uses cookies (including the DoubleClick DART cookie) to serve ads based on your prior visits to our website and other websites across the internet.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to 6Pistons and/or other sites on the Internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-BrandRed hover:underline"
              >
                Google Ads Settings
              </a>{" "}
              or by visiting{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-BrandRed hover:underline"
              >
                aboutads.info
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            4. Analytics & Performance Partners
          </h2>
          <p>
            We utilize analytics tools, including Google Tag Manager and search performance monitors, to understand traffic patterns and article readership. These tools collect aggregated, non-personally identifiable metrics such as bounce rate, average read time, and geographic regions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            5. How We Use Your Information
          </h2>
          <p>We use collected data solely to:</p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-400">
            <li>Operate, maintain, and enhance the performance of the 6Pistons publication.</li>
            <li>Respond to editorial pitches, reader questions, and press release submissions.</li>
            <li>Detect and prevent security threats, unauthorized access, and malicious bot traffic.</li>
            <li>Fulfill legal and regulatory requirements.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            6. Your Privacy Rights (GDPR & CCPA)
          </h2>
          <p>
            Depending on your jurisdiction (such as the European Union or California), you may hold the following statutory privacy rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-400">
            <li><strong className="text-white">Right to Access:</strong> You may request copies of personal data we retain regarding you.</li>
            <li><strong className="text-white">Right to Rectification:</strong> You may request correction of any inaccurate or incomplete data.</li>
            <li><strong className="text-white">Right to Erasure:</strong> You may request deletion of your personal contact records.</li>
            <li><strong className="text-white">Do Not Sell:</strong> We do not sell, rent, or trade your personal information to data brokers.</li>
          </ul>
          <p>
            To exercise any of these rights, please email us at{" "}
            <a href="mailto:privacy@6pistons.com" className="text-BrandRed hover:underline">
              privacy@6pistons.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            7. Children&apos;s Information
          </h2>
          <p>
            6Pistons does not knowingly collect personally identifiable information from children under the age of 13. If you believe your child has submitted personal details on our platform, please contact us immediately, and we will promptly delete such records from our systems.
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            8. Contact Us
          </h2>
          <p>
            If you have questions or concerns regarding this Privacy Policy, contact our privacy officer at:
          </p>
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 font-mono text-sm">
            <p className="text-white font-bold">6Pistons Media</p>
            <p className="text-neutral-400">Email: <a href="mailto:privacy@6pistons.com" className="text-BrandRed hover:underline">privacy@6pistons.com</a></p>
            <p className="text-neutral-400">General: <a href="mailto:contact@6pistons.com" className="text-BrandRed hover:underline">contact@6pistons.com</a></p>
            <p className="text-neutral-400">Website: <Link href="/" className="text-BrandRed hover:underline">www.6pistons.com</Link></p>
          </div>
        </section>
      </div>
    </div>
  );
}
