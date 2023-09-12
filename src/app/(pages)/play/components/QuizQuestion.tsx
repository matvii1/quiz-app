import { FC } from "react"
import { Card, CardDescription, CardHeader } from "@/components/ui"

type QuizQuestionProps = {
  questionIndex: number
  questionsLength: number
  questionText: string
}

const QuizQuestion: FC<QuizQuestionProps> = ({
  questionIndex,
  questionsLength,
  questionText,
}) => {
  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center gap-6 text-muted-foreground">
        <div className="flex flex-col items-center">
          <div className="font-bold text-primary">{questionIndex + 1}</div>
          <span className="rotate-[10deg h-[1px] w-4 bg-muted-foreground"></span>
          <div>{questionsLength}</div>
        </div>
        <CardDescription>{questionText}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export { QuizQuestion }
