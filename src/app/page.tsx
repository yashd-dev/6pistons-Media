import AllBlogs from "./components/AllBlogs";
import { fetchCategories, fetchPosts } from "@/app/actions/fetchPosts";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "6Pistons - Motor Reviews Done Right",
  description:
    "Professional motor and automotive reviews by 6Pistons Media. Expert analysis, road tests, and comprehensive coverage of the latest vehicles.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "6Pistons - Motor Reviews Done Right",
    description:
      "Professional motor and automotive reviews by 6Pistons Media. Expert analysis, road tests, and comprehensive coverage of the latest vehicles.",
    url: "https://www.6pistons.com",
    siteName: "6Pistons Media",
    type: "website",
  },
};

// GROQ query to fetch the latest 3 blog posts for a specific category

export default async function Home({ searchParams }: { searchParams: any }) {
  const param = await searchParams;
  const page = typeof param.page === "string" ? Number(param.page) : 1;
  const category: any =
    typeof param.category === "string" ? param.category : null;

  const { posts, totalCount } = await fetchPosts(page, 10, category);
  if (posts.length === 0) return redirect("/");
  const categories = await fetchCategories();

  return (
    <AllBlogs
      initialPosts={posts}
      totalCount={totalCount}
      categories={categories}
      initialPage={page}
      initialCategory={category}
    />
  );
}
