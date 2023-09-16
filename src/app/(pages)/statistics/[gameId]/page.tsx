import { GameNotFound } from "@/app/(pages)/gameNotFound"
import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { MCQStatistics } from "../components/mcq"

type GameStatisticsProps = {
  params: {
    gameId: string
  }
}

const GameStatistics: FC<GameStatisticsProps> = async ({
  params: { gameId },
}) => {
  const session = await getAuthSession()

  if (!session?.user) {
    return redirect("/")
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: true,
    },
  })

  if (!game) {
    return <GameNotFound />
  }

  if (!game?.timeEnded) {
    const gameType = game?.gameType === "open_ended" ? "open-ended" : "mcq"
    return redirect(`/play/${gameType}/${gameId}`)
  }

  if (game.gameType === "multiple_choice") {
    return <MCQStatistics game={game} />
  }

  return (
    <main className="container flex-1">
      
    </main>
  )
}

export default GameStatistics
