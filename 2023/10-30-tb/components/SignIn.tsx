'use client'

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "aws-amplify/auth"

export default function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleLogin() {
    await signIn({
      username: usernameRef.current?.value ?? "",
      password: passwordRef.current?.value ?? ""
    })

    router.push('/')
  }
  return <div>
    <input type="text" placeholder="username" ref={usernameRef}/>
    <input type="password" placeholder="password" ref={passwordRef} />
    <button onClick={handleLogin}>Login</button>
  </div>
}