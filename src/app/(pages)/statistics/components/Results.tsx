import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CustomPieChart,
} from "@/components/ui"
import { PieChart } from "lucide-react"
import { FC } from "react"

const Results: FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-xl font-bold">Results</CardTitle>
        <PieChart size={22} strokeWidth={3} />
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="max-w-[200px]">
          <CustomPieChart />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <CardDescription>
          Nice try! You got 5 out of 10 questions correct.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

export { Results }
