import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

import { urlFor } from "@/sanity/lib/image";

export default async function BlogPostPrev() {
  const posts = await client.fetch(POSTS_QUERY);
  const image = urlFor(posts[0].mainImage.asset._ref).toString();
  console.log(image);
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post._id}>
          <a href={`/posts/${post?.slug.current}`}>{post?.title}</a>
          <img src={image} alt={post.title} />
        </li>
      ))}
    </ul>
  );
}
