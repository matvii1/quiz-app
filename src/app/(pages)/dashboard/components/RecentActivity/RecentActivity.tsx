import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import { Game } from "@prisma/client"
import { FC } from "react"
import { RecentActivityList } from "."

type RecentActivityProps = {
  games: Game[]
}

const RecentActivity: FC<RecentActivityProps> = ({ games }) => {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Recent Activities</CardTitle>
        <CardDescription>
          {games.length
            ? `You have played a total of ${games.length} quizzes`
            : "You have not played any quizzes yet."}
        </CardDescription>
      </CardHeader>

      <CardContent className="max-h-[580px] overflow-auto">
        <RecentActivityList games={games} />
      </CardContent>
    </Card>
  )
}

export { RecentActivity }
