import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Hourglass } from "lucide-react"
import { FC } from "react"

type TimeTakenProps = {
  timeTaken: string
}

const TimeTaken: FC<TimeTakenProps> = ({ timeTaken }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Time taken</CardTitle>
          <Hourglass size={22} strokeWidth={3} />
        </div>
        <CardDescription>{timeTaken}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export { TimeTaken }
