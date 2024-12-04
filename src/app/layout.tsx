import type { Metadata } from "next";
import { Big_Shoulders_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
  title: "91 Turbo",
  description: "Motor Reviews Done Right",
  metadataBase: new URL("https://91turbo.com"),
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
        src="https://analytics.nmims.tech/script.js"
        data-website-id="3eb3d6e7-a495-42e3-81db-470aebe028f7"
      />
      <body
        className={`${hankenGrotesk.style} ${bigShouldersDisplay.variable} antialiased h-full w-full`}
      >
        {children}
      </body>
    </html>
  );
}
