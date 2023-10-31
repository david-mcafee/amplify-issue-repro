import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { client } from "@/utils/data-client";

export default async function NewPostPage() {
  async function createPostAndComment(formData: FormData) {
    'use server'

    await client.models.Post.create({
      title: formData.get('title')?.toString() ?? "",
      body: formData.get('body')?.toString() ?? "",
      link: formData.get('url')?.toString() ?? "",
    });

    revalidatePath('/')
    redirect('/')
  }

  return <form className="flex flex-col gap-2" action={createPostAndComment}>
    <input placeholder="title" type="text" name="title"></input>
    <input placeholder="body" type="text" name="body"></input>
    <input placeholder="url" type="url" name="url"></input>
    <button type="submit">Submit</button>
  </form>
}