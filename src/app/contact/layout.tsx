import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Press Inquiries - 6Pistons Media",
  description:
    "Get in touch with 6Pistons Media. Submit PR press releases, editorial pitches, advertising requests, and review feedback to our newsroom.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Press Inquiries - 6Pistons Media",
    description:
      "Get in touch with 6Pistons Media. Submit PR press releases, editorial pitches, advertising requests, and review feedback to our newsroom.",
    url: "https://www.6pistons.com/contact",
    siteName: "6Pistons Media",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
