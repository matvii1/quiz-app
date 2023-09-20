import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Target } from "lucide-react"
import { FC } from "react"

type HighestSimilarityProps = {
  highestSimilarity: number
}

const HighestSimilarity: FC<HighestSimilarityProps> = ({
  highestSimilarity,
}) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Highest Accuracy</CardTitle>
          <Target size={22} strokeWidth={1.5} />
        </div>
        <CardDescription>{highestSimilarity}%</CardDescription>
      </CardHeader>
    </Card>
  )
}

export { HighestSimilarity }
