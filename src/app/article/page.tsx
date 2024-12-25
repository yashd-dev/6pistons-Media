import AllBlogs from "../components/AllBlogs";
import { fetchCategories, fetchPosts } from "@/app/actions/fetchPosts";
export const dynamic = "force-dynamic";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const page =
    typeof (await searchParams.page) === "string"
      ? Number(searchParams.page)
      : 1;
  const category: any =
    typeof (await searchParams.category) === "string"
      ? searchParams.category
      : null;

  const { posts, totalCount } = await fetchPosts(page, 10, category);
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
    </>
  );
}
