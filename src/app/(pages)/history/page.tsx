import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import {
  RecentActivity,
  RecentActivityList,
} from "../dashboard/components/RecentActivity"
import { Card, CardContent } from "@/components/ui"

const History: FC = async () => {
  const session = await getAuthSession()

  if (!session?.user) {
    return redirect("/")
  }

  const historyGames = await prisma.game.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      timeStarted: "desc",
    },
  })

  return (
    <Card className="mt-4 max-h-[580px] overflow-auto">
      <CardContent className="px-6 py-4">
        <RecentActivityList games={historyGames} />
      </CardContent>
    </Card>
  )
}

export default History
