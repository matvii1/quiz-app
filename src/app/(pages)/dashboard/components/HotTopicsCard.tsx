import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  WordCloud,
} from "@/components/ui"
import { FC } from "react"

type HotTopicsCardProps = {
  topics: string[]
}

const HotTopicsCard: FC<HotTopicsCardProps> = ({ topics }) => {
  const wordCloudData = topics.map((topic) => ({
    text: topic,
    value: Math.round(Math.random() * 20),
  }))

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Hot topics</CardTitle>
        <CardDescription>
          See what quizzes other people are taking!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {wordCloudData.length ? (
          <WordCloud data={wordCloudData} />
        ) : (
          <p className="text-center text-muted-foreground">No topics yet.</p>
        )}
      </CardContent>
    </Card>
  )
}

export { HotTopicsCard }
