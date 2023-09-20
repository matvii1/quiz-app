import { GameNotFound } from "@/app/(pages)/gameNotFound"
import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { MCQStatistics } from "../components/mcq"
import { OpenEndedStatistics } from "../components/open-ended"

type GameStatisticsProps = {
  params: {
    gameId: string
  }
}

const GameStatistics: FC<GameStatisticsProps> = async ({
  params: { gameId },
}) => {
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

  if (game.gameType === "open_ended") {
    return <OpenEndedStatistics game={game} />
  }
}

export default GameStatistics
