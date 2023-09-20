import { Card, CardContent } from "@/components/ui"
import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { FC } from "react"
import { RecentActivityList } from "../dashboard/components/RecentActivity"

const History: FC = async () => {
  const session = await getAuthSession()

  const historyGames = await prisma.game.findMany({
    where: {
      userId: session!.user.id,
    },
    orderBy: {
      timeStarted: "desc",
    },
  })

  return historyGames.length ? (
    <Card className="mt-4 max-h-[580px] overflow-auto">
      <CardContent className="px-6 py-4">
        <RecentActivityList games={historyGames} />
      </CardContent>
    </Card>
  ) : (
    <div className="mt-4 text-sm">
      <p>You have not played any games yet. </p>
    </div>
  )
}

export default History
