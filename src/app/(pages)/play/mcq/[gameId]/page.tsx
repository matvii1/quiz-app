import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { MCQGame } from "../../components"
import { MCQuizProvider } from "../../providers"

type MCQPageProps = {
  params: {
    gameId: string
  }
}

const MCQPage: FC<MCQPageProps> = async ({ params: { gameId } }) => {
  const session = await getAuthSession()

  if (!session?.user) {
    return redirect("/")
  }

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
