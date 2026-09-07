"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, Newspaper, Megaphone, PenTool, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [department, setDepartment] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto construct as universal fallback
    const subject = encodeURIComponent(`[${department.toUpperCase()}] Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nDepartment: ${department}\n\nMessage:\n${message}`);
    window.location.href = `mailto:contact@6pistons.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-36 sm:pt-44 lg:pt-48 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-neutral-200">
      {/* Header */}
      <header className="text-center mb-16 sm:mb-20">
        <p className="text-BrandRed uppercase tracking-widest text-xs font-semibold mb-3 font-mono">
          Reach the Newsroom
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold font-bigShoulders tracking-tight text-white mb-6">
          Contact & Press Inquiries
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
          Whether you have a press release, an insider automotive tip, an advertising request, or feedback on a review, we want to hear from you.
        </p>
      </header>

      {/* Structured Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-BrandRed/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-BrandRed/10 text-BrandRed flex items-center justify-center mb-4">
              <Newspaper className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-lg text-white mb-1">PR & Press Releases</h2>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Automaker PR departments, media loan inquiries, and official press announcements.
            </p>
          </div>
          <a
            href="mailto:contact@6pistons.com?subject=Press%20Release%20Submission"
            className="text-xs font-mono font-semibold text-BrandRed hover:underline flex items-center gap-1.5"
          >
            contact@6pistons.com &rarr;
          </a>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-BrandRed/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-BrandRed/10 text-BrandRed flex items-center justify-center mb-4">
              <PenTool className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-lg text-white mb-1">Editorial Pitches</h2>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Freelance motoring writers, automotive photographers, and track test pitches.
            </p>
          </div>
          <a
            href="mailto:contact@6pistons.com?subject=Editorial%20Pitch"
            className="text-xs font-mono font-semibold text-BrandRed hover:underline flex items-center gap-1.5"
          >
            contact@6pistons.com &rarr;
          </a>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-BrandRed/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-BrandRed/10 text-BrandRed flex items-center justify-center mb-4">
              <Megaphone className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-lg text-white mb-1">Advertising & Media Kit</h2>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Direct sponsorship, custom branded campaigns, and media kit requests.
            </p>
          </div>
          <a
            href="mailto:contact@6pistons.com?subject=Advertising%20Inquiry"
            className="text-xs font-mono font-semibold text-BrandRed hover:underline flex items-center gap-1.5"
          >
            contact@6pistons.com &rarr;
          </a>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-BrandRed/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-BrandRed/10 text-BrandRed flex items-center justify-center mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-lg text-white mb-1">General Inquiries</h2>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Reader questions, review feedback, and general communication with founders.
            </p>
          </div>
          <a
            href="mailto:contact@6pistons.com?subject=General%20Inquiry"
            className="text-xs font-mono font-semibold text-BrandRed hover:underline flex items-center gap-1.5"
          >
            contact@6pistons.com &rarr;
          </a>
        </div>
      </div>

      {/* Main Form & Office Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Form */}
        <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-neutral-950/60 border border-white/10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-bigShoulders tracking-wide text-white uppercase mb-2">
            Send an Online Inquiry
          </h2>
          <p className="text-neutral-400 text-sm mb-8">
            Select the appropriate department so your message reaches the correct desk without delay.
          </p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-BrandRed/10 border border-BrandRed/30 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-BrandRed mx-auto" />
              <h3 className="text-xl font-bold text-white">Opening Email Client...</h3>
              <p className="text-neutral-300 text-sm max-w-md mx-auto">
                If your default mail client did not open automatically, please send your email directly to{" "}
                <a href="mailto:contact@6pistons.com" className="text-BrandRed underline font-mono">
                  contact@6pistons.com
                </a>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lewis Hamilton"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-BrandRed/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-BrandRed/50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                  Department / Subject *
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-BrandRed/50 text-sm"
                >
                  <option value="press">PR, Manufacturer Invites & Press Releases</option>
                  <option value="editorial">Editorial Pitch or Freelance Submission</option>
                  <option value="advertising">Advertising, Media Kit & Commercial Inquiries</option>
                  <option value="general">General Feedback / Inquiries</option>
                  <option value="correction">Factual Correction / Editorial Update</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide context, release dates, vehicle details, or your pitch..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-BrandRed/50 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-BrandRed hover:bg-red-600 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-BrandRed/20"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-lg font-bigShoulders tracking-wide uppercase">
              Fast Response Desk
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Our editorial inbox is reviewed continuously by our senior road testers and editors. Urgent embargoed announcements should be marked <strong>[EMBARGO]</strong> in the subject line.
            </p>
            <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono text-neutral-300">
              <p>Primary Inbox: <a href="mailto:contact@6pistons.com" className="text-BrandRed">contact@6pistons.com</a></p>
              <p>Location: Mumbai / Global Coverage</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-lg font-bigShoulders tracking-wide uppercase">
              Social Media
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Follow breaking automotive drops, short-form track videos, and road tests:
            </p>
            <div className="space-y-2 text-xs">
              <a
                href="https://x.com/6pistonsmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-neutral-300 hover:text-white transition-colors"
              >
                <span>X / Twitter</span>
                <span className="font-mono text-BrandRed">@6pistonsmedia &rarr;</span>
              </a>
              <a
                href="https://www.instagram.com/6pistonsmedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-neutral-300 hover:text-white transition-colors"
              >
                <span>Instagram</span>
                <span className="font-mono text-BrandRed">@6pistonsmedia &rarr;</span>
              </a>
              <a
                href="https://www.youtube.com/@6Pistons-Media"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-neutral-300 hover:text-white transition-colors"
              >
                <span>YouTube</span>
                <span className="font-mono text-BrandRed">@6Pistons-Media &rarr;</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-BrandRed/10 border border-BrandRed/20 text-center">
            <p className="text-xs text-neutral-300 leading-relaxed">
              Want to see who is reviewing your vehicles?{" "}
              <Link href="/about" className="text-BrandRed font-semibold hover:underline">
                Meet our Editorial Team &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
