"use client"

import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

type QueryProviderProps = {
  children: ReactNode
}

const client = new QueryClient()

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export { QueryProvider }
