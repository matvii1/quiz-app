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
import { Hash } from "lucide-react"
import { FC } from "react"

type OpenEndedQuestionsTableProps = {
  game: Game & { questions: Question[] }
}

const OpenEndedQuestionsTable: FC<OpenEndedQuestionsTableProps> = ({
  game,
}) => {
  return (
    <Card className="mt-6">
      <CardContent>
        <Table className='min-w-[630px]'>
          <TableCaption className="mt-1">Questions and answers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead min>
                <Hash className="h-4 w-4" />
              </TableHead>
              <TableHead>Questions</TableHead>
              <TableHead className='min-w-[120px] pr-4'>Your answer</TableHead>
              <TableHead className="-translate-x-3">Similarity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {game.questions.map((row, index) => {
              const { answer, question, userAnswer, percentageCorrect } = row
              const questionId = index + 1

              return (
                <TableRow key={answer}>
                  <TableCell className="py-4 font-medium">
                    {questionId}
                  </TableCell>
                  <TableCell>
                    <p className="text-base font-bold">{question}</p>
                    <p className="mt-1 text-sm">
                      <span className="text-muted-foreground">Answer:</span>{" "}
                      <br />
                      {answer}
                    </p>
                  </TableCell>
                  <TableCell className="max-w-[240px] px-4 pl-2 pt-4 align-top">
                    <p className="text-sm">{userAnswer}</p>
                  </TableCell>
                  <TableCell className="pt-4 align-top">
                    {Math.round(percentageCorrect!) + "%"}
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

export { OpenEndedQuestionsTable }
