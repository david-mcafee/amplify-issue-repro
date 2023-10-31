'use client'

import { signOut } from "aws-amplify/auth"
import { revalidatePath } from "next/cache"
import { useRouter } from 'next/navigation'

export default function SignOut() {
  const router = useRouter()

  return <button onClick={async () => {
    await signOut()
    router.push('/login')
  }} className="px-2 bg-white text-black">Sign out</button>
}