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
    text: topic[0].toUpperCase() + topic.slice(1),
    value: Math.round(Math.random() * 20),
  }))

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Hot topics</CardTitle>
        <CardDescription>
          <span>See what quizzes other people are taking!</span>
          <span className="text-muted-foreground block">
            Click on the topic to start the quiz
          </span>
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
