import AllBlogs from "./components/AllBlogs";
import { fetchCategories, fetchPosts } from "@/app/actions/fetchPosts";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

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
    <>
      <AllBlogs
        initialPosts={posts}
        totalCount={totalCount} // Subtract 1 from total count as we're featuring one post
        categories={categories}
        initialPage={page}
        initialCategory={category}
      />
      <section className="flex flex-col items-start justify-start w-full h-full relative z-20 px-4 py-10 text-foreground mx-auto gap-10 max-w-[90rem]">
        <div className="h-1 w-full bg-BrandRed/10"></div>
        <h1
          className="md:text-xl font-bold uppercase text-BrandRed w-full inline-flex justify-between"
          id="contact"
        >
          Contact
        </h1>
        <p className="text-xl md:text-3xl font-medium text-foreground max-w-prose">
          You can reach out to us anytime at{" "}
          <a
            href="mailto:contact@6pistons.com"
            className="text-BrandRed hover:underline"
          >
            contact@6pistons.com
          </a>
        </p>
      </section>
    </>
  );
}
