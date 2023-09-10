"use client"

import { Badge } from "@/components/ui"
import { Timer } from "lucide-react"
import { FC } from "react"
import { StatisticsCard } from "."
import { useMSQContext } from "../providers"

const GameHeader: FC = () => {
  const { timer, topic } = useMSQContext()

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

      <StatisticsCard />
    </div>
  )
}

export { GameHeader }
