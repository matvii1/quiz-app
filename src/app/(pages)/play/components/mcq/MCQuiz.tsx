"use client"

import { FC } from "react"
import { OptionCard } from "."
import { QuizQuestion } from ".."
import { useMSQContext } from "../../providers/mcq"

const MCQuiz: FC = () => {
  const {
    currentQuestion: question,
    questionsLength,
    questionIndex,
    options,
  } = useMSQContext()

  return (
    <>
      <QuizQuestion
        questionIndex={questionIndex}
        questionText={question.question}
        questionsLength={questionsLength}
      />

      <ul className="mt-4 flex flex-col items-center gap-3">
        {options.map((option, index) => (
          <OptionCard key={index} option={option} index={index} />
        ))}
      </ul>
    </>
  )
}

export { MCQuiz }
