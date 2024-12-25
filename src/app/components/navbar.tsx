"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 flex justify-center z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="flex items-center justify-between px-5 md:px-10 py-5 text-foreground bg-black rounded-xl bg-opacity-30 backdrop-blur-md gap-8 mt-10 ">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="6Piston Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/#about"
            className="md:text-xl font-medium hover:text-BrandRed transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="md:text-xl font-medium hover:text-BrandRed transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            href="/article"
            className="md:text-xl font-medium hover:text-BrandRed transition-colors duration-300"
          >
            Articles
          </Link>
        </div>
      </nav>
    </div>
  );
}
