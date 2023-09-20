"use client"

import { api } from "@/app/axios"
import { buttonVariants } from "@/components/ui"
import { getQuizTime } from "@/lib/getQuizTime"
import { cn } from "@/lib/utils"
import { Game } from "@prisma/client"
import { BarChartBig, Loader2 } from "lucide-react"
import Link from "next/link"
import { FC } from "react"
import { useQuery } from "react-query"

type EndGameProps = {
  gameId: string
}

const EndGame: FC<EndGameProps> = ({ gameId }) => {
  const {
    data: game,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["game", gameId],
    queryFn: async () => {
      const { data } = await api.get(`/api/game/${gameId}`)

      return data.game as Game
    },
  })

  if (isLoading) {
    return <Loader2 className="h-6 w-6 animate-spin" />
  }

  if (game?.timeEnded == null || isError) {
    return (
      <p
        className={buttonVariants({
          variant: "destructive",
        })}
      >
        Something went wrong. Please try again later.
      </p>
    )
  }

  const messagePart = getQuizTime(game.timeStarted, game.timeEnded)

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center">
      <div className="mt-2 max-w-sm rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white dark:bg-green-700">
        {`You completed the game in ${messagePart}`}
      </div>
      <Link
        href={`/statistics/${gameId}`}
        className={cn(buttonVariants({ size: "lg" }), "mt-2")}
      >
        View Statistics
        <BarChartBig className="ml-2 h-4 w-4" />
      </Link>
    </div>
  )
}

export default EndGame
