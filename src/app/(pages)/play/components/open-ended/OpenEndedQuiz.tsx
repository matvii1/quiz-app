import { FC } from "react"
import { QuizQuestion } from ".."
import { useOpenEndedContext } from "../../providers"

const OpenEndedQuiz: FC = () => {
  const { currentQuestion, questionIndex, questionsLength } =
    useOpenEndedContext()

  return (
    <>
      <QuizQuestion
        questionText={currentQuestion.question}
        questionIndex={questionIndex}
        questionsLength={questionsLength}
      />

			{/* TODO: create form for submitting an answer to endpoint */}
    </>
  )
}

export { OpenEndedQuiz }
