import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CustomPieChart,
} from "@/components/ui"
import { getResultMessage } from "@/lib/getResultMessage"
import { PieChart } from "lucide-react"
import { FC } from "react"

type ResultsProps = {
  gameLength: number
  amountCorrect: number
}

const MCQResults: FC<ResultsProps> = ({ gameLength, amountCorrect }) => {
  const percentageCorrect = Math.round((amountCorrect / gameLength) * 100)
  const message = getResultMessage(percentageCorrect)

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-xl font-bold">Results</CardTitle>
        <PieChart size={22} strokeWidth={3} />
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="max-w-[200px]">
          <CustomPieChart percentageCorrect={percentageCorrect} />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <CardDescription>
          {message} You got {amountCorrect} out of {gameLength} questions
          correct.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

export { MCQResults }
