'use client'

import { Button } from '@/components/ui'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const { data, status } = useSession()
  const router = useRouter()

  function switchTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (status === 'loading') return <div>Loading</div>
  if (status === 'unauthenticated') {
    router.push('/login')

    return
  }

  return (
    <header className="p-4">
      <Button variant="outline" onClick={switchTheme}>
        Toggle
      </Button>
    </header>
  )
}
