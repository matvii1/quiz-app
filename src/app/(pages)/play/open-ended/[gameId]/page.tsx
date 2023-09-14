import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { OpenEndedGame } from "../../components/open-ended"
import { OpenEndedProvider } from "../../providers"

type OpenEndedProps = {
  params: {
    gameId: string
  }
}

const OpenEnded: FC<OpenEndedProps> = async ({ params: { gameId } }) => {
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
          answer: true,
        },
      },
    },
  })

  if (!game || game.gameType !== "open_ended") {
    return redirect("/dashboard")
  }

  return (
    <main className="container flex flex-1 items-center justify-center">
      <OpenEndedProvider game={game}>
        <OpenEndedGame />
      </OpenEndedProvider>
    </main>
  )
}

export default OpenEnded
