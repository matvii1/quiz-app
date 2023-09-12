"use client"

import { Badge, buttonVariants } from "@/components/ui"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { FC, useEffect, useState } from "react"

type EndGameProps = {
  timeStarted: Date
  gameId: string
}

const EndGame: FC<EndGameProps> = ({ timeStarted, gameId }) => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  })

  useEffect(() => {
    if (!timeStarted) return

    const now = new Date()
    const difference =  timeStarted.getTime() - now.getTime()

    const hours = Math.floor(difference / 3600)
    const minutes = Math.floor((difference - hours * 3600) / 60)
    const seconds = Math.floor(difference - hours * 3600 - minutes * 60)
    setTime({
      seconds,
      minutes,
      hours,
    })
  }, [timeStarted])

  const hours = time.hours > 0 ? `${time.hours}h,` : ""
  const minutes = time.minutes > 0 ? `${time.minutes}m, and` : ""
  const seconds = time.seconds > 0 ? `${time.seconds}s` : ""

  return (
    <div className="flex max-w-sm flex-col gap-6">
      <Badge
        variant="outline"
        className="truncate py-2"
      >{`The game took ${hours} ${minutes} ${seconds} to complete.`}</Badge>
      <Link href={`/statistics/${gameId}`} className={cn(buttonVariants())}>
        View statistics
      </Link>
    </div>
  )
}

export default EndGame
