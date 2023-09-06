import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import { FC } from "react"
import { RecentActivityList } from "."

const RecentActivity: FC = () => {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Recent Activities</CardTitle>
        <CardDescription>You have played a total of 10 quizzed</CardDescription>
      </CardHeader>

      <CardContent className="max-h-[580px] overflow-auto">
        <RecentActivityList />
      </CardContent>
    </Card>
  )
}

export { RecentActivity }
