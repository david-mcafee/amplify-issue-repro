"use client"

import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";

const client = generateClient<Schema>()

export default function LiveCommentlist({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Schema["Comment"][]>([])

  useEffect(() => {

    async function fetchInitialList() {
      const { data: comments, errors } = await client.models.Comment.list({ filter: { postCommentsId: { eq: postId } } })
      if (errors) {
        console.log(errors)
        return
      }
      setComments(comments)
    }
    fetchInitialList()

    const createSub = client.models.Comment.onCreate().subscribe({
      next: (comment) => {
        setComments(comments => [...comments, comment])
      }
    })

    const deleteSub = client.models.Comment.onDelete().subscribe({
      next: (comment) => {
        setComments(comments => comments.filter(c => c.id !== comment.id))
      }
    })

    return () => {
      createSub.unsubscribe()
      deleteSub.unsubscribe()
    }
  }, [postId])

  

  return <ul>
    <button onClick={async () => {
      await client.models.Comment.create({
        content: Date.now().toString(),
        post: {
          id: postId,
          body: "hello",
          // @ts-ignore
          comments: async () => Promise.resolve({ data: [] as unknown }),
          createdAt: "",
          updatedAt: "",
          link: "hello"
        }
      })
    }}>click</button>
    {comments.map(comment => <li key={comment.id} onClick={async () => {await client.models.Comment.delete(comment)}}>{comment.content}</li>)}
  </ul>
}