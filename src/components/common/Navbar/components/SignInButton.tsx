"use client"
import { Button } from "@/components/ui"
import { signIn } from "next-auth/react"
import { FC } from "react"

type SignInButtonProps = {
  text: string
}

const SignInButton: FC<SignInButtonProps> = ({ text }) => {
  async function handleSignIn() {
    await signIn("google").catch(console.error)
  }

  return <Button onClick={handleSignIn}>{text}</Button>
}

export { SignInButton }
