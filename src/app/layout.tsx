import { Navbar } from "@/components/common"
import { SessionProvider, ThemeProvider } from "@/components/providers"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "../lib/utils"
import "./global.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex min-h-screen flex-col antialiased",
        )}
      >
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="default" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
