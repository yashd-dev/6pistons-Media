import { HomeClient } from "@/app/components/heroClient";
import { client } from "@/sanity/lib/client";
import BlogSection from "./components/blogSection";

// GROQ query to fetch the latest 3 blog posts for a specific category
const LATEST_POSTS_BY_CATEGORY_QUERY = `
  *[_type == "post" && $category in categories[]->title] 
  | order(publishedAt desc)[0...3]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    description,
  }
`;

export default async function Home() {
  let carPosts = await client.fetch(LATEST_POSTS_BY_CATEGORY_QUERY, {
    category: "cars",
  });
  const carsPost = await client.fetch(LATEST_POSTS_BY_CATEGORY_QUERY, {
    category: "Car News",
  });
  const genPosts = await client.fetch(LATEST_POSTS_BY_CATEGORY_QUERY, {
    category: "General News",
  });
  carPosts.push(...genPosts);
  carPosts.push(...carsPost);
  carPosts = carPosts.reduce((acc: any, item: any) => {
    if (!acc.some((el: any) => el._id === item._id)) {
      acc.push(item);
    }
    return acc;
  }, []);
  carPosts.sort(
    (a: any, b: any) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  let bikePost = await client.fetch(LATEST_POSTS_BY_CATEGORY_QUERY, {
    category: "Bikes",
  });
  const bikesPosts = await client.fetch(LATEST_POSTS_BY_CATEGORY_QUERY, {
    category: "Bikes News",
  });
  bikePost.push(...bikesPosts);
  bikePost = bikePost.reduce((acc: any, item: any) => {
    if (!acc.some((el: any) => el._id === item._id)) {
      acc.push(item);
    }
    return acc;
  }, []);
  bikePost.sort(
    (a: any, b: any) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <HomeClient />
      <BlogSection title="Latest Car Articles" posts={carPosts} />
      <BlogSection title="Latest Bike Articles" posts={bikePost} />
      <section className="flex flex-col items-start justify-start w-full h-full relative z-20 px-4 py-10 md:p-28 text-foreground mx-auto gap-10">
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
