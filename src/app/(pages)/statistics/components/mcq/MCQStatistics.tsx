import { Game, Question } from "@prisma/client"
import { FC } from "react"
import { MCQQuestionsTable } from "."
import { Header, Results, TimeTaken } from ".."

type MCQStatisticsProps = {
  game: Game & { questions: Question[] }
}

const MCQStatistics: FC<MCQStatisticsProps> = ({ game }) => {
  const amountCorrect = game.questions.reduce((prev, curr) => {
    return prev + (curr.answer === curr.userAnswer ? 1 : 0)
  }, 0)

  const amountAnswers = game.questions.length

  const precentageCorrect = Math.round((amountCorrect / amountAnswers) * 100)
  return (
    <main className="container flex-1">
      <Header />

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <Results />
        </div>

        <div className="sm:col-span-1">
          <TimeTaken />
        </div>
      </section>

      <section>
        <MCQQuestionsTable game={game} />
      </section>

      {/* <p>correct {amountCorrect}</p>
      <h2>Precentage correct {precentageCorrect}%</h2>
      <pre className="mt-4 rounded-md bg-slate-800 p-2">
        <code className="text-secondary">{JSON.stringify(game, null, 2)}</code>
      </pre> */}
    </main>
  )
}

export { MCQStatistics }
