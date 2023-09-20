import { FC, ReactNode } from "react"
import { Navbar } from "@/components/common"
import {
  QueryProvider,
  SessionProvider,
  ThemeProvider,
} from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Toaster />
      <SessionProvider>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="default" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </SessionProvider>
    </>
  )
}

export { MainLayout }
