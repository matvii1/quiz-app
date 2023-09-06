"use client"

import { fontSizeMapper } from "@/lib/fontSizeMapper"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { FC } from "react"

const D3WordCloud = dynamic(() => import("react-d3-cloud"), { ssr: false })

const data = [
  {
    text: "vercel",
    value: 3,
  },
  {
    text: "CSS",
    value: 5,
  },
]

const WordCloud: FC = () => {
  const { theme } = useTheme()

  return (
    <D3WordCloud
      height={550}
      rotate={0}
      data={data}
      fontSize={(word) => fontSizeMapper(word)}
      padding={10}
      fill={theme === "dark" ? "#fff" : "#000"}
      font="Times"
      random={Math.random}
      spiral="archimedean"
    />
  )
}

export { WordCloud }
