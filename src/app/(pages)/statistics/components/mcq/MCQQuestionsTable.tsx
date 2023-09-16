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
import { Check, Hash, X } from "lucide-react"
import { FC } from "react"
import { MCQTableOptions } from "."

type MCQQuestionsTableProps = {
  game: Game & { questions: Question[] }
}

const MCQQuestionsTable: FC<MCQQuestionsTableProps> = ({ game }) => {
  return (
    <Card className="mt-6">
      <CardContent>
        <Table>
          <TableCaption className="mt-1">Questions and answers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead min>
                <Hash className="h-4 w-4" />
              </TableHead>
              <TableHead>Questions & Answers</TableHead>
              <TableHead>Status</TableHead>
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
                      userAnswer={userAnswer!}
                      options={options as string[]}
                      answer={answer}
                    />
                  </TableCell>
                  <TableCell>
                    {isUserCorrect ? <Check size={18} /> : <X size={18} />}
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
