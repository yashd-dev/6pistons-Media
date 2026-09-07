"use client";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <footer
      className="border-t border-red-500 max-w-[90rem] mx-auto"
      id="about"
      ref={ref}
    >
      <div
        className=" w-full px-4 md:px-0 relative z-50 mx-auto text-white "
        style={{
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <div className="w-full border-t border-red-500/30"></div>
        <div className="gap-4 p-4 md:p-0 md:py-16 py-16 sm:pb-16 md:flex md:justify-between">
          <div className="mb-12 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                className="h-10 w-auto"
                src="/logo.svg"
                alt="6pistons Logo"
                width={40}
                height={40}
              />
            </Link>
            <div className="max-w-prose">
              <div className="z-10 mt-4 flex w-full flex-col items-start text-left">
                <p className="text-lg lg:text-xl">
                  Brand Led by Enthusiasts
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white tracking-wider">
                Quick Links
              </h2>
              <ul className="grid gap-2.5">
                <li>
                  <Link
                    href="/about"
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-neutral-400 hover:text-neutral-200"
                  >
                    About Us
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      <path
                        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-neutral-400 hover:text-neutral-200"
                  >
                    Contact & Inquiries
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      <path
                        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/article"
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-neutral-400 hover:text-neutral-200"
                  >
                    Articles
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      <path
                        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white tracking-wider">
                Editorial & Legal
              </h2>
              <ul className="grid gap-2.5">
                <li>
                  <Link
                    href="/editorial-guidelines"
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-neutral-400 hover:text-neutral-200"
                  >
                    Editorial Guidelines
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-neutral-400 hover:text-neutral-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-neutral-400 hover:text-neutral-200"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white tracking-wider">
                Follow Us
              </h2>
              <ul className="grid gap-2.5">
                <li>
                  <Link
                    href="https://x.com/6pistonsmedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-neutral-400 hover:text-neutral-200"
                  >
                    X (Twitter)
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/6pistonsmedia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-neutral-400 hover:text-neutral-200"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/@6Pistons-Media"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-neutral-400 hover:text-neutral-200"
                  >
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t py-4 sm:flex sm:flex-row sm:items-center sm:justify-between border-red-500/30">
          <p id="contact" className="text-sm text-neutral-400">
            You can reach out to us anytime at{" "}
            <Link
              href="/contact"
              className="text-neutral-200 hover:text-BrandRed transition-colors underline"
            >
              contact@6pistons.com
            </Link>
          </p>
          <div className="flex space-x-5 sm:mt-0 sm:justify-center">
            <Link
              href="https://www.linkedin.com/company/6pistons-media/"
              target="_blank"
              rel="noopener noreferrer"
              className="fill-neutral-500 text-neutral-500 hover:fill-neutral-300 hover:text-neutral-300 transition-colors"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
              >
                <path
                  d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Linkedin</span>
            </Link>
            <Link
              href="https://x.com/6pistonsmedia"
              target="_blank"
              rel="noopener noreferrer"
              className="fill-neutral-500 text-neutral-500 hover:fill-neutral-300 hover:text-neutral-300 transition-colors"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M9.333 6.929L14.544 1H13.31L8.784 6.143L5.17 1H1L6.463 8.789L1 15H2.235L7.009 9.575L10.829 15H15L9.333 6.929ZM7.633 8.867L7.079 8.092L2.678 1.932H4.575L8.127 6.903L8.681 7.679L13.31 14.158H11.413L7.633 8.867Z" />
              </svg>
              <span className="sr-only">X (formerly Twitter)</span>
            </Link>
            <Link
              href="https://www.instagram.com/6pistonsmedia/"
              target="_blank"
              rel="noopener noreferrer"
              className="fill-neutral-500 text-neutral-500 hover:fill-neutral-600 hover:text-neutral-600"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
              >
                <path
                  d="M7.5 4.5A3 3 0 1 0 7.5 10.5A3 3 0 1 0 7.5 4.5ZM7.5 9A1.5 1.5 0 1 1 7.5 6A1.5 1.5 0 0 1 7.5 9ZM10.75 4.25A0.75 0.75 0 1 1 10.75 5.75A0.75 0.75 0 0 1 10.75 4.25ZM13 7.5C13 10.5376 10.5376 13 7.5 13C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5ZM12 7.5C12 5.01472 9.98528 3 7.5 3C5.01472 3 3 5.01472 3 7.5C3 9.98528 5.01472 12 7.5 12C9.98528 12 12 9.98528 12 7.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://www.youtube.com/@6Pistons-Media"
              target="_blank"
              rel="noopener noreferrer"
              className="fill-neutral-500 text-neutral-500 hover:fill-neutral-600 hover:text-neutral-600"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
              >
                <path
                  d="M12.5 4.5c-.14-.53-.56-.95-1.09-1.09C10.5 3 7.5 3 7.5 3s-3 0-3.91.41A1.25 1.25 0 0 0 2.5 4.5C2 5.41 2 7.5 2 7.5s0 2.09.5 3c.14.53.56.95 1.09 1.09C4.5 12 7.5 12 7.5 12s3 0 3.91-.41c.53-.14.95-.56 1.09-1.09.5-.91.5-3 .5-3s0-2.09-.5-3ZM6.5 9.5V5.5l4 2-4 2Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
