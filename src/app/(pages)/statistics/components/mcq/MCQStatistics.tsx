import { getQuizTime } from "@/lib/getQuizTime"
import { Game, Question } from "@prisma/client"
import { FC } from "react"
import { MCQQuestionsTable } from "."
import { MCQResults, TimeTaken } from ".."
import { PageHeader } from "@/components/common"

type MCQStatisticsProps = {
  game: Game & { questions: Question[] }
}

const MCQStatistics: FC<MCQStatisticsProps> = ({ game }) => {
  const amountCorrect = game.questions.reduce((prev, curr) => {
    return prev + (curr.isCorrect ? 1 : 0)
  }, 0)

  const timeTaken = getQuizTime(game.timeStarted, game.timeEnded!)

  return (
    <>
      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <MCQResults
            amountCorrect={amountCorrect}
            gameLength={game.questions.length}
          />
        </div>

        <div className="sm:col-span-1">
          <TimeTaken timeTaken={timeTaken} />
        </div>
      </section>

      <section>
        <MCQQuestionsTable game={game} />
      </section>
    </>
  )
}

export { MCQStatistics }
