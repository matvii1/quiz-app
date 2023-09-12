"use client"

import { Card, CardContent, Separator } from "@/components/ui"
import { CheckCircle, XCircle } from "lucide-react"
import { FC } from "react"
import { useMSQContext } from "../providers/mcq"

type StatisticsCardProps = {
  statistics: {
    correctCount: number
    wrongCount: number
  }
}

const StatisticsCard: FC<StatisticsCardProps> = ({ statistics }) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-2 p-3">
        <div className="flex items-center gap-2 text-green-500 dark:text-green-600">
          <CheckCircle />
          <p>{statistics.correctCount}</p>
        </div>

        <Separator orientation="vertical" className="h-5" />

        <div className="flex items-center gap-2 text-destructive">
          <XCircle />
          <p>{statistics.wrongCount}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export { StatisticsCard }
