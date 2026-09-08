"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Car, Plane, Users, Mail, BookOpen, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Search from "./search";

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      // Keep visible if mobile menu is open, or scrolling up, or near top
      setVisible(
        mobileMenuOpen || prevScrollPos > currentScrollPos || currentScrollPos < 15
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-transform duration-300 pointer-events-none ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Main Floating Navbar Pill */}
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto flex items-center justify-between px-3.5 sm:px-5 md:px-7 2xl:px-8 py-2 sm:py-2.5 md:py-3 2xl:py-3.5 text-foreground bg-neutral-950/85 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl mt-3 sm:mt-4 md:mt-6 max-w-[calc(100vw-1.5rem)] sm:max-w-fit mx-auto transition-all"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center group transition-transform duration-200 hover:scale-105 shrink-0 mr-2 sm:mr-3 md:mr-6"
            aria-label="6Pistons Home"
          >
            <Image
              src="/logo.svg"
              alt="6Pistons Media"
              width={120}
              height={32}
              className="h-5 sm:h-5.5 md:h-6 2xl:h-7 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop & Laptop Navigation Links (md and up) */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 2xl:gap-8">
            <Link
              href="/?category=Cars"
              className={`text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                pathname === "/" ? "hover:text-BrandRed" : "text-neutral-300 hover:text-white"
              }`}
            >
              Cars
            </Link>
            <Link
              href="/?category=Aviation"
              className="text-sm lg:text-base font-medium text-neutral-300 hover:text-BrandRed transition-colors duration-200 whitespace-nowrap"
            >
              Aviation
            </Link>
            <Link
              href="/about"
              className={`text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                pathname === "/about" ? "text-BrandRed font-semibold" : "text-neutral-300 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                pathname === "/contact" ? "text-BrandRed font-semibold" : "text-neutral-300 hover:text-white"
              }`}
            >
              Contact
            </Link>
            <Search />
          </div>

          {/* Mobile & Phone Controls (< md) */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <Search />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all border border-white/10 shrink-0"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl md:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            {/* Navigation Links */}
            <div className="flex flex-col gap-2 max-w-sm mx-auto w-full">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-2 px-3">
                Editorial Categories
              </span>

              <Link
                href="/?category=Cars"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-BrandRed/10 border border-white/10 active:border-BrandRed/40 transition-all text-lg font-medium text-white group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-BrandRed/10 flex items-center justify-center text-BrandRed">
                    <Car className="w-5 h-5" />
                  </div>
                  <span>Cars & Supercars</span>
                </div>
                <span className="text-xs font-mono text-neutral-500 group-hover:text-BrandRed">
                  Reviews
                </span>
              </Link>

              <Link
                href="/?category=Aviation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-BrandRed/10 border border-white/10 active:border-BrandRed/40 transition-all text-lg font-medium text-white group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Plane className="w-5 h-5" />
                  </div>
                  <span>Aviation</span>
                </div>
                <span className="text-xs font-mono text-neutral-500 group-hover:text-blue-400">
                  Insights
                </span>
              </Link>

              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mt-4 mb-2 px-3">
                Publication
              </span>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-base font-medium ${
                  pathname === "/about"
                    ? "bg-BrandRed/10 border-BrandRed/40 text-BrandRed"
                    : "bg-white/[0.02] border-white/5 text-neutral-200 hover:bg-white/[0.06]"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400">
                  <Users className="w-4 h-4" />
                </div>
                <span>About & Editorial Team</span>
              </Link>

              <Link
                href="/editorial-guidelines"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-neutral-200 hover:bg-white/[0.06] transition-all text-base font-medium"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Editorial Guidelines</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-base font-medium ${
                  pathname === "/contact"
                    ? "bg-BrandRed/10 border-BrandRed/40 text-BrandRed"
                    : "bg-white/[0.02] border-white/5 text-neutral-200 hover:bg-white/[0.06]"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Contact Editorial Desk</span>
              </Link>
            </div>

            {/* Bottom Section with Socials & Legal */}
            <div className="pt-6 border-t border-white/10 max-w-sm mx-auto w-full text-center">
              <div className="flex items-center justify-center gap-6 mb-4">
                <a
                  href="https://x.com/6pistonsmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors text-sm font-mono"
                >
                  X
                </a>
                <a
                  href="https://www.instagram.com/6pistonsmedia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors text-sm font-mono"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@6Pistons-Media"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors text-sm font-mono"
                >
                  YouTube
                </a>
                <a
                  href="https://www.linkedin.com/company/6pistons-media/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors text-sm font-mono"
                >
                  LinkedIn
                </a>
              </div>
              <p className="text-xs text-neutral-500 font-mono">
                6Pistons Media • Brand Led by Enthusiasts
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}