import { MainLayout } from '@/components/layouts'
import { SessionProvider, ThemeProvider } from '@/components/providers'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased min-h-screen')}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="default" enableSystem>
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
