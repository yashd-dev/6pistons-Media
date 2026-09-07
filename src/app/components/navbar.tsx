"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import Search from "./search"

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  return (
    <div
      className={`fixed top-0 left-0 right-0 flex justify-center z-50 transition-transform duration-300 pointer-events-none ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="pointer-events-auto flex items-center justify-between px-4 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 text-foreground bg-neutral-950/85 border border-white/10 rounded-2xl backdrop-blur-md gap-3 sm:gap-5 md:gap-7 mt-4 md:mt-6 shadow-2xl">
        <Link href="/" className="flex items-center group transition-transform duration-200 hover:scale-105 shrink-0" aria-label="6Pistons Home">
          <Image
            src="/logo.svg"
            alt="6Pistons Media"
            width={120}
            height={32}
            className="h-5 sm:h-6 md:h-7 w-auto object-contain"
            priority
          />
        </Link>
        <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
          <Link
            href="/?category=Cars"
            className="text-xs sm:text-sm md:text-base font-medium hover:text-BrandRed transition-colors duration-200 whitespace-nowrap"
          >
            Cars
          </Link>
          <Link
            href="/?category=Aviation"
            className="text-xs sm:text-sm md:text-base font-medium hover:text-BrandRed transition-colors duration-200 whitespace-nowrap"
          >
            Aviation
          </Link>
          <Link
            href="/about"
            className="text-xs sm:text-sm md:text-base font-medium hover:text-BrandRed transition-colors duration-200 whitespace-nowrap"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-xs sm:text-sm md:text-base font-medium hover:text-BrandRed transition-colors duration-200 whitespace-nowrap"
          >
            Contact
          </Link>
          <Search />
        </div>
      </nav>
    </div>
  )
}