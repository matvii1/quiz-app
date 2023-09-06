import { Title } from "@/components/ui"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { Card, HotTopicsCard } from "./components"
import { RecentActivity } from "./components/RecentActivity"

const Dashborad: FC = async () => {
  const session = await getAuthSession()

  if (!session?.user) {
    return redirect("/")
  }

  return (
    <main className="container flex-1">
      <div className="flex items-center gap-3">
        <Title className="mt-6">Dashboard</Title>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card
          title="Quiz me!"
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
        <HotTopicsCard />
        <RecentActivity />
      </div>
    </main>
  )
}

export default Dashborad
