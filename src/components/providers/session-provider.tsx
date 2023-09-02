'use client'

import { SessionProvider as NextSessionProvider } from 'next-auth/react'
import { FC } from 'react'

type SessionProviderProps = {
  children: React.ReactNode
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  return <NextSessionProvider>{children}</NextSessionProvider>
}
