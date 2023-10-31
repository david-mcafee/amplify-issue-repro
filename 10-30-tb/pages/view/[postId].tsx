import { Schema } from '@/amplify/data/resource'
import { generateServerClient } from '@aws-amplify/adapter-nextjs'
import type { SelectionSet } from '@aws-amplify/amplify-api-next-types-alpha'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type Mutable<T> = {
  -readonly [K in keyof T]:  Mutable<T[K]>;
}

const selectionSet = [
  "id",
  "title",
  "link",
  "body",
  "comments.*",
] as const
 
export const getServerSideProps = (async (context) => {
  const client = generateServerClient<Schema>({ request: context.req, response: context.res })
  const id = context.query?.postId as string

  const { data: post } = await client.models.Post.get(
    { id },
    {
      selectionSet: selectionSet as Mutable<typeof selectionSet>,
    }
  );
  return { props: { post } }
}) satisfies GetServerSideProps<{
  post: SelectionSet<Schema["Post"], Mutable<typeof selectionSet>>
}>
 
export default function Page({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        </div>
      </article>
    </>
  );
}
