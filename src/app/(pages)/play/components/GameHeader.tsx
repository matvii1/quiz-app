"use client"

import { Badge } from "@/components/ui"
import { Timer } from "lucide-react"
import { FC } from "react"
import { StatisticsCard } from "."

type GameHeaderProps = {
  timer: number
  topic: string
  statistics: {
    correctCount: number
    wrongCount: number
  }
  type: "open_ended" | "multiple-choice"
}

const GameHeader: FC<GameHeaderProps> = ({
  timer,
  topic,
  statistics,
  type,
}) => {
  return (
    <div className="mt-6 flex justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground">Topic:</p>
          <Badge>{topic}</Badge>
        </div>
        <div className="flex gap-1">
          <Timer className="text-muted-foreground" />
          {timer}
        </div>
      </div>

      {type === "multiple-choice" && <StatisticsCard statistics={statistics} />}
    </div>
  )
}

export { GameHeader }
