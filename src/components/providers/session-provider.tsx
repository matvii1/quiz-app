"use client"

import { SessionProvider as NextSessionProvider } from "next-auth/react"
import { FC, ReactNode } from "react"

type SessionProviderProps = {
  children: ReactNode
}

const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  return <NextSessionProvider>{children}</NextSessionProvider>
}

export { SessionProvider }
