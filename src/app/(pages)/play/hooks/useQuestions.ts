import { useState } from "react"

export function useQuestion(questionLength: number) {
  const [questionIndex, setQuestionIndex] = useState(0)

  function next() {
    setQuestionIndex((prev) => {
      if (prev < questionLength - 1) {
        return prev + 1
      }

      return prev
    })
  }

  function prev() {
    setQuestionIndex((prev) => {
      if (prev > 0) {
        return prev - 1
      }

      return prev
    })
  }

  const isNextShown = questionIndex < questionLength - 1
  const isPrevShown = questionIndex > 0

  return {
    questionIndex,
    next,
    prev,
    isNextShown,
    isPrevShown,
  }
}
