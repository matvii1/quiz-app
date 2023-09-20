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

type OpenEndedResultsProps = {
  percentagesOfGame: number
  gameLength: number
}

const OpenEndedResults: FC<OpenEndedResultsProps> = ({
  percentagesOfGame,
  gameLength,
}) => {
  const message = getResultMessage(percentagesOfGame)

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-xl font-bold">Results</CardTitle>
        <PieChart size={22} strokeWidth={3} />
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="max-w-[200px]">
          <CustomPieChart percentageCorrect={percentagesOfGame} />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <CardDescription className="sm:px-14">
          {message} You got a total of {percentagesOfGame}% correct out of{" "}
          {gameLength} questions.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

export { OpenEndedResults }
