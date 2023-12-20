import AddComment from "@/components/AddComment";
import LiveCommentlist from "@/components/LiveCommentList";
import { client } from "@/utils/data-client";


export default async function PostPage({ params: { id } }: { params: { id: string } }) {
  const { data: post } = await client.models.Post.get(
    { id },
    {
      selectionSet: [
        "id",
        "title",
        "link",
        "body",
        "comments.*",
      ],
    }
  );

  return (
    <>
      <article>
        <h2>{post.title}</h2>
        <span className="text-gray-400">
          <a href={post.link} />
        </span>
        <p>{post.body}</p>
        <div className="max-w-xs"></div>
        <hr />
        <AddComment postId={post.id} />
        <hr />
        <div className="pt-5">
          <ul className="flex flex-col gap-4">
            {post.comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.content}</p>
                <i>{new Date(comment.createdAt).toLocaleString()}</i>
              </li>
            ))}
          </ul>
          <LiveCommentlist postId={post.id} />
        </div>
      </article>
    </>
  );
}
