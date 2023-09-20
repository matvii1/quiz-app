import { Card, CardContent } from "@/components/ui"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Game, Question } from "@prisma/client"
import { Check, Hash, TimerOff, X } from "lucide-react"
import { FC } from "react"
import { MCQTableOptions } from "."
import { ToolTip } from ".."

type MCQQuestionsTableProps = {
  game: Game & { questions: Question[] }
}

const MCQQuestionsTable: FC<MCQQuestionsTableProps> = ({ game }) => {
  return (
    <Card className="mt-6">
      <CardContent>
        <Table className="min-w-[630px]">
          <TableCaption className="mt-1">Questions and answers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead min>
                <Hash className="h-4 w-4" />
              </TableHead>
              <TableHead>Questions & Answers</TableHead>
              <TableHead className="-translate-x-3">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {game.questions.map((row, index) => {
              const { answer, question, options, userAnswer } = row
              const questionId = index + 1
              const isUserCorrect = answer === userAnswer

              return (
                <TableRow key={answer}>
                  <TableCell className="py-4 font-medium">
                    {questionId}
                  </TableCell>
                  <TableCell>
                    <p className="text-base font-bold">{question}</p>

                    <MCQTableOptions
                      userAnswer={userAnswer}
                      options={options as string[]}
                      answer={answer}
                    />
                  </TableCell>
                  <TableCell>
                    {isUserCorrect ? (
                      <ToolTip label="You got this question right">
                        <Check
                          size={18}
                          className="text-green-400 dark:text-green-500"
                          strokeWidth={3}
                        />
                      </ToolTip>
                    ) : !userAnswer ? (
                      <ToolTip label="You did not make this question in time">
                        <TimerOff
                          size={18}
                          strokeWidth={3}
                          className="text-red-400 dark:text-red-500"
                        />
                      </ToolTip>
                    ) : (
                      <ToolTip label="You got this question wrong">
                        <X
                          size={18}
                          strokeWidth={3}
                          className="text-red-400 dark:text-red-500"
                        />
                      </ToolTip>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export { MCQQuestionsTable }
