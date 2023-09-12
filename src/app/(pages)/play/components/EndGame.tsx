"use client"

import { Badge, buttonVariants } from "@/components/ui"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { FC, useEffect, useState } from "react"
import { useMSQContext } from "../providers/mcq"

const EndGame: FC = () => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  })

  const { game } = useMSQContext()

  useEffect(() => {
    if (!game) return

    const now = new Date()
    const difference = now.getTime() - game.timeStarted.getTime()

    const hours = Math.floor(difference / 3600)
    const minutes = Math.floor((difference - hours * 3600) / 60)
    const seconds = Math.floor(difference - hours * 3600 - minutes * 60)
    setTime({
      seconds,
      minutes,
      hours,
    })
  }, [game])

  const hours = time.hours > 0 ? `${time.hours}h,` : ""
  const minutes = time.minutes > 0 ? `${time.minutes}m, and` : ""
  const seconds = time.seconds > 0 ? `${time.seconds}s` : ""

  return (
    <div className="flex max-w-sm flex-col gap-6">
      <Badge
        variant="outline"
        className="truncate py-2"
      >{`The game took ${hours} ${minutes} ${seconds} to complete.`}</Badge>
      <Link href="/statistics" className={cn(buttonVariants())}>
        View statistics
      </Link>
    </div>
  )
}

export default EndGame
