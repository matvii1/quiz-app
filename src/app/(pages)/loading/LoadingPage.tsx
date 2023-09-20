"use client"

import { Progress } from "@/components/ui"
import { useTheme } from "next-themes"
import Image from "next/image"
import { FC, useEffect, useMemo, useState } from "react"

const loadingMessages = [
  "Crafting challenging questions just for you...",
  "Gathering knowledge from the depths of the internet...",
  "Pouring creativity into your quiz...",
  "Stirring the quiz potion...",
  "Shaping your quiz adventure...",
  "Diving deep into the quiz universe...",
]

type LoadingPageProps = {
  isDone: boolean
}

const LoadingPage: FC<LoadingPageProps> = ({ isDone }) => {
  const { theme } = useTheme()
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => {
        if (prev === loadingMessages.length - 1) {
          return 0
        }

        return prev + 1
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isDone) return

      setProgressValue((prev) => {
        if (prev === 100 && !isDone) {
          return 0
        }

        if (Math.random() <= 0.15) {
          return prev + 2
        }

        if (prev < 100) {
          return prev + 0.5
        }

        return prev
      })

      if (isDone) {
        clearInterval(interval)
        setProgressValue(100)
      }

      return () => clearInterval(interval)
    }, 100)
  }, [isDone])

  const isDark = useMemo(() => theme === "dark", [theme])

  return (
    <div>
      <Image
        src={isDark ? "/loading-dark.gif" : "/loading.gif"}
        alt="loading animation"
        width={420}
        height={420}
      />

      <div className="mt-2 max-w-[420px]">
        <Progress value={progressValue} className="mx-auto xs:w-[420px]" />
        <p className="mt-2 truncate">{loadingMessages[loadingMessageIndex]}</p>
      </div>
    </div>
  )
}

export { LoadingPage }
