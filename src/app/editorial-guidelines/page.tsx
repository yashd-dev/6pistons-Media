import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial & Ethics Guidelines - 6Pistons Media",
  description:
    "Learn about 6Pistons Media's rigorous editorial standards, test driving methodology, press vehicle loaner policy, advertising separation, and fact-checking principles.",
  metadataBase: new URL("https://www.6pistons.com"),
  alternates: {
    canonical: "/editorial-guidelines",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EditorialGuidelinesPage() {
  return (
    <div className="min-h-screen pt-36 sm:pt-44 lg:pt-48 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-neutral-200">
      <header className="mb-12 border-b border-white/10 pb-8">
        <p className="text-BrandRed uppercase tracking-widest text-xs font-semibold mb-2 font-mono">
          Journalistic Standards & E-E-A-T
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold font-bigShoulders tracking-tight text-white mb-4">
          Editorial & Ethics Guidelines
        </h1>
        <p className="text-sm text-neutral-400">
          Our commitment to honesty, independence, and technical rigor in automotive journalism.
        </p>
      </header>

      <div className="space-y-12 text-neutral-300 leading-relaxed text-sm sm:text-base">
        {/* Core Philosophy */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            1. Brand Led by Enthusiasts
          </h2>
          <p>
            At <strong>6Pistons Media</strong>, our mission is simple: <em>automotive reviews done right</em>. We are a publication founded and operated by genuine road testers, engineers, and motoring enthusiasts. Our allegiance is exclusively to our readers—car and motorcycle buyers, track enthusiasts, and industry observers.
          </p>
          <p>
            We hold our content to strict standards of transparency, technical accuracy, and unbiased criticism. No marketing department or automotive manufacturer dictates our editorial stance.
          </p>
        </section>

        {/* Vehicle Testing Methodology */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            2. How We Test Vehicles
          </h2>
          <p>
            Every car, motorcycle, or electric vehicle reviewed by 6Pistons undergoes real-world evaluation beyond standard spec sheets:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
              <h3 className="font-bold text-white mb-1 text-base">Real-World Driving</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We test vehicles in everyday conditions—stop-and-go city traffic, rough road surfaces, highway cruising, and tight parking scenarios.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
              <h3 className="font-bold text-white mb-1 text-base">Performance & Dynamics</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                When evaluating performance cars, we assess throttle response, brake feel, chassis composure, steering feedback, and body roll.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
              <h3 className="font-bold text-white mb-1 text-base">EV Real-World Efficiency</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                For electric vehicles, we cross-reference manufacturer claimed range against real-world highway consumption and charging curve speeds.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
              <h3 className="font-bold text-white mb-1 text-base">Ergonomics & Tech</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We critically review infotainment responsiveness, climate controls, cabin build quality, and driver-assistance systems.
              </p>
            </div>
          </div>
        </section>

        {/* Press Loaners Policy */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            3. Press Vehicles & Manufacturer Events Policy
          </h2>
          <p>
            Like all major automotive publications, our journalists frequently evaluate vehicles provided on temporary press loan by automobile manufacturers, or attend media launch programs:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-400">
            <li>
              <strong className="text-white">Editorial Independence:</strong> Automakers never have the right to preview, edit, or approve review drafts prior to publication.
            </li>
            <li>
              <strong className="text-white">No Paid Verdicts:</strong> We never accept payment, gifts, or incentives in exchange for favorable coverage, high scores, or positive reviews.
            </li>
            <li>
              <strong className="text-white">Travel & Launch Programs:</strong> When manufacturers host national or international launch events (covering travel and accommodations), our attendance is accepted strictly for the purpose of testing the vehicle. It carries zero expectation of positive press.
            </li>
          </ul>
        </section>

        {/* Advertising Separation */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            4. Separation of Editorial & Commercial Operations
          </h2>
          <p>
            There is a strict, impenetrable wall between the 6Pistons editorial desk and commercial advertising partners:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-400">
            <li>Editorial staff do not sell advertising, and advertising executives do not influence article content or review ratings.</li>
            <li>Any sponsored article, branded collaboration, or commercial partnership is explicitly and visibly labeled as <strong>&ldquo;Sponsored&rdquo;</strong> or <strong>&ldquo;Partner Content&rdquo;</strong> at the top of the article.</li>
            <li>Advertising partners cannot purchase removal of critical reviews or negative commentary.</li>
          </ul>
        </section>

        {/* Corrections Policy */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            5. Corrections & Fact-Checking Policy
          </h2>
          <p>
            We strive for 100% accuracy across vehicle specifications, pricing details, and performance metrics. When an error occurs:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-400">
            <li>We correct the error promptly and transparently within the article.</li>
            <li>Substantive factual corrections are marked with an editorial update note detailing what was modified and when.</li>
            <li>Readers and automakers are encouraged to submit factual corrections to <a href="mailto:editorial@6pistons.com" className="text-BrandRed hover:underline">editorial@6pistons.com</a>.</li>
          </ul>
        </section>

        {/* AI Disclosure */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            6. Human-Led Motoring Journalism
          </h2>
          <p>
            Automotive journalism requires physical sensory evaluation: the texture of steering resistance, the sound of an exhaust valve opening, the pedal modulation, and the spatial feel of an interior cabin.
          </p>
          <p>
            Every vehicle review and opinion piece published on 6Pistons is written, edited, and verified by real human motoring journalists. We do not publish automated, hallucinated, or unverified AI-generated reviews.
          </p>
        </section>

        {/* Contact Desk */}
        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-bigShoulders tracking-wide uppercase">
            7. Editorial Contact
          </h2>
          <p>
            Have feedback on a review, an insider tip, or a manufacturer press release?
          </p>
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 font-mono text-sm">
            <p className="text-white font-bold">6Pistons Editorial Desk</p>
            <p className="text-neutral-400">Editor-in-Chief & Tips: <a href="mailto:contact@6pistons.com" className="text-BrandRed hover:underline">contact@6pistons.com</a></p>
            <p className="text-neutral-400">Press Releases: <a href="mailto:contact@6pistons.com" className="text-BrandRed hover:underline">contact@6pistons.com</a></p>
            <p className="text-neutral-400">Team Masthead: <Link href="/about" className="text-BrandRed hover:underline">View Editorial Team</Link></p>
          </div>
        </section>
      </div>
    </div>
  );
}
