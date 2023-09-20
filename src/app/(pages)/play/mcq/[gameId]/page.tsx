import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { MCQuizProvider } from "../../providers/mcq"
import { MCQGame } from "../../components/mcq"

type MCQPageProps = {
  params: {
    gameId: string
  }
}

const MCQPage: FC<MCQPageProps> = async ({ params: { gameId } }) => {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  })

  if (!game || game.gameType !== "multiple_choice") {
    return redirect("/dashboard")
  }

  return (
    <main className="container flex flex-1 items-center justify-center">
      <MCQuizProvider game={game}>
        <MCQGame />
      </MCQuizProvider>
    </main>
  )
}

export default MCQPage
