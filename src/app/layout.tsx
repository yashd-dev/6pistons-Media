import type { Metadata } from "next";
import { Big_Shoulders_Display, Hanken_Grotesk } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";
import Script from "next/script";
import Footer from "./components/footer";
export const dynamic = "force-dynamic";
export const revalidate = 10;
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const bigShouldersDisplay = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-big-shoulders-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "6 Pistons",
  description: "Motor Reviews Done Right",
  metadataBase: new URL("https://6pistons.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="78106722-fc0d-4a3d-b559-0bf289f72e23"
      />
      <body
        className={`${hankenGrotesk.style} ${bigShouldersDisplay.variable} antialiased h-full w-full relative`}
      >
        <div className="fixed inset-0 bg-background z-20 bg-[url('/noise.png')] bg-[length:50px_50px] bg-[0_0] " />

        <Navbar></Navbar>
        <section className="relative z-20">{children}</section>
        <Footer></Footer>
      </body>
    </html>
  );
}
