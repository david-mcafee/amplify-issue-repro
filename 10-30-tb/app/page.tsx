import Link from "next/link";
import { client } from "@/utils/data-client";

export default async function HomePage() {
  const { data: posts, errors } = await client.models.Post.list({
    selectionSet: ["id", "title", "link", "comments.*"],
  });

  if (!posts || posts.length === 0 || errors) {
    return (
      <div>
        <p>
          There are no posts right now.{" "}
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {posts.map((post) => {
        const url = new URL(post.link);
        return (
          <li key={post.id}>
            <a href={post.link}>{post.title}</a>{" "}
            <span className="text-gray-400 text-sm">
              <a className="hover:underline" href={`#`}>
                ({url.hostname})
              </a>
            </span>
            <div className="text-sm text-gray-500">
              <Link className="hover:underline" href={`/post/${post.id}`}>
                ({post.comments.length}) comments
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
