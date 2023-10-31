import { client } from "@/utils/data-client";
import { revalidatePath } from "next/cache";

export default async function AddComment({ postId } : { postId: string }) {

  async function addComment(formData: FormData) {
    'use server'

    const { data: post } = await client.models.Post.get({
      id: postId
    })

    await client.models.Comment.create({
      content: formData.get('content')?.toString() ?? "", 
      post
    })

    revalidatePath(`/post/${post.id}`)
  }

  return <form action={addComment}>
    <div className="flex flex-col items-start">
      <textarea name="content" />
      <button type="submit">Add comment</button>
    </div>
  </form>
}