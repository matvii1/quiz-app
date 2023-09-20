"use client"

import { fontSizeMapper } from "@/lib/fontSizeMapper"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { redirect, useRouter } from "next/navigation"
import { FC } from "react"

const D3WordCloud = dynamic(() => import("react-d3-cloud"), { ssr: false })

type WordClodProps = {
  data: {
    text: string
    value: number
  }[]
}

const WordCloud: FC<WordClodProps> = ({ data }) => {
  const { theme } = useTheme()
  const router = useRouter()

  return (
    <D3WordCloud
      height={550}
      rotate={0}
      data={data}
      fontSize={(word) => fontSizeMapper(word)}
      padding={10}
      fill={theme === "dark" ? "#fff" : "#000"}
      font="Times"
      onWordClick={(_, word) => {
        console.log("he;;p")
        return router.push(`/quiz?topic=${word.text}`)
      }}
      random={Math.random}
      spiral="archimedean"
    />
  )
}

export { WordCloud }
