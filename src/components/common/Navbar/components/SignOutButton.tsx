"use client"

import { Button } from "@/components/ui"
import { signOut } from "next-auth/react"
import { FC } from "react"

type SignOutButtonProps = {
  text: string
}

const SignOutButton: FC<SignOutButtonProps> = ({ text }) => {
  function handleSignOut() {
    signOut().catch(console.error)
  }

  return <Button onClick={handleSignOut}>{text}</Button>
}

export { SignOutButton }
