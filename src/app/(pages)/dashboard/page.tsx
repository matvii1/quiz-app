import { Badge, Dialog, Title } from "@/components/ui"
import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { Card, DescDialog, HotTopicsCard } from "./components"
import { RecentActivity } from "./components/RecentActivity"

const Dashboard: FC = async () => {
  const session = await getAuthSession()

  const recentGames = await prisma.game.findMany({
    where: {
      userId: session!.user.id,
    },
    orderBy: {
      timeStarted: "desc",
    },
    take: 5,
  })

  const games = await prisma.game.findMany({
    where: {
      userId: session!.user.id,
    },
    orderBy: {
      timeStarted: "desc",
    },
    take: 15,
  })

  const topicsArr = games.map((game) => game.topic.toLowerCase())

  const topics = [...new Set(topicsArr)]

  return (
    <main className="container flex-1">
      <div className="flex items-center gap-3">
        <Title className="mt-6">Dashboard</Title>
        <DescDialog />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card
          title="Create a Quiz!"
          description="Quiz me! is a quiz app that helps you learn by quizzing you on the
          things you want to learn."
          icon="brain"
          navigateTo="/quiz"
        />
        <Card
          title="History"
          description="View post quiz statistics and see how you're doing."
          icon="history"
          navigateTo="/history"
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard topics={topics} />
        <RecentActivity games={recentGames} />
      </div>
    </main>
  )
}

export default Dashboard
