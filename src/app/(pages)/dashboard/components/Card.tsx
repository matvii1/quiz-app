"use client"

import {
  CardContent,
  CardHeader,
  CardTitle,
  Card as UiCard,
} from "@/components/ui"
import { BrainCircuit, History } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC } from "react"

type CardProps = {
  title: string
  description: string
  icon: "history" | "brain"
  navigateTo: "/quiz" | "/history"
}

const ICONS = {
  history: <History size={28} strokeWidth={2.8} />,
  brain: <BrainCircuit size={28} strokeWidth={2.8} />,
} as const

const Card: FC<CardProps> = ({ title, description, icon, navigateTo }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(navigateTo)
  }

  return (
    <UiCard
      onClick={handleClick}
      className="group cursor-pointer transition-opacity hover:opacity-75 dark:hover:opacity-[unset]"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        {ICONS[icon]}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground dark:text-foreground">
          {description}
        </p>
      </CardContent>
    </UiCard>
  )
}

export { Card }
