import { Game, Question } from "@prisma/client"
import { FC } from "react"

import { getQuizTime } from "@/lib/getQuizTime"
import { HighestSimilarity, OpenEndedQuestionsTable, OpenEndedResults } from "."
import { TimeTaken } from ".."
import { PageHeader } from "@/components/common"

type OpenEndedStatisticsProps = {
  game: Game & { questions: Question[] }
}

const OpenEndedStatistics: FC<OpenEndedStatisticsProps> = ({ game }) => {
  const totalPercentages = game.questions.reduce((prev, curr) => {
    return prev + curr.percentageCorrect!
  }, 0)
  const highestSimilarity = Math.round(
    Math.max(...game.questions.map((q) => q.percentageCorrect!)),
  )

  const percentagesOfGame = Math.round(totalPercentages / game.questions.length)

  const timeTaken = getQuizTime(game.timeStarted, game.timeEnded!)

  return (
    <>
      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <OpenEndedResults
            percentagesOfGame={percentagesOfGame}
            gameLength={game.questions.length}
          />
        </div>

        <div className="sm:col-span-1">
          <TimeTaken timeTaken={timeTaken} />
          <HighestSimilarity highestSimilarity={highestSimilarity} />
        </div>
      </section>

      <section>
        <OpenEndedQuestionsTable game={game} />
      </section>
    </>
  )
}

export { OpenEndedStatistics }
