import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import { FC } from "react"

const HotTopicsCard: FC = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Hot topics</CardTitle>
        <CardDescription>Click on the topic to start the quiz!</CardDescription>
      </CardHeader>
      <CardContent>word cloud</CardContent>
    </Card>
  )
}

export { HotTopicsCard }
