import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Hourglass } from "lucide-react"
import { FC } from "react"

const TimeTaken: FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Time taken</CardTitle>
          <Hourglass size={22} strokeWidth={3} />
        </div>
        <CardDescription>11m</CardDescription>
      </CardHeader>
    </Card>
  )
}

export { TimeTaken }
