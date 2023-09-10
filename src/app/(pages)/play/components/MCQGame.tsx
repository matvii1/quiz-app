"use client"

import { api } from "@/app/axios"
import { Button } from "@/components/ui"
import { ChevronRight, Loader2 } from "lucide-react"
import { redirect } from "next/navigation"
import { FC, useCallback } from "react"
import { useMutation } from "react-query"
import { z } from "zod"
import { GameHeader, MCQuiz } from "."
import { checkAnswerSchema } from "../../quiz/schemas"
import { useKeyboradNavigation } from "../hooks"
import { useMSQContext } from "../providers"

const MCQGame: FC = () => {
  const {
    isNextShown,
    selectedOptionIndex,
    next,
    currentQuestion,
    setStatistics,
    resetTimer,
    options,
    questionIndex,
    questionsLength,
    setSelectedOptionIndex,
  } = useMSQContext()

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        answer: options[selectedOptionIndex!],
        questionId: currentQuestion.id,
      }

      return api.post(`/api/checkAnswer`, payload)
    },
  })

  const handleNext = useCallback(() => {
    console.log(selectedOptionIndex)
    if (selectedOptionIndex == null) return

    checkAnswer(undefined, {
      onSuccess: ({ data }) => {
        if (data.correct) {
          setStatistics((prev) => ({
            ...prev,
            correctCount: prev.correctCount + 1,
          }))
        }

        if (!data.correct) {
          setStatistics((prev) => ({
            ...prev,
            wrongCount: prev.wrongCount + 1,
          }))
        }

        resetTimer()
        setSelectedOptionIndex(null)
        next()
      },
    })
  }, [checkAnswer, setStatistics, next, resetTimer, selectedOptionIndex])

  const handleSubmit = useCallback(() => {
    console.log(selectedOptionIndex)
    if (selectedOptionIndex == null) return

    handleNext()

    // TODO: redirect to result page
    return redirect("/")
  }, [handleNext, selectedOptionIndex])

  const handleSelectNextOption = () => {
    setSelectedOptionIndex((prev) => {
      if (prev == null) return 0
      if (prev === options.length - 1) return 0

      return prev + 1
    })
  }

  const handleSelectPrevOption = useCallback(() => {
    setSelectedOptionIndex((prev) => {
      if (prev == null) return options.length - 1
      if (prev >= 1) return prev - 1
      if (prev === 0) return options.length - 1

      return prev
    })
  }, [setSelectedOptionIndex, options.length])

  useKeyboradNavigation({
    next: handleSelectNextOption,
    prev: handleSelectPrevOption,
  })

  return (
    <div className="w-[90%] md:w-[700px]">
      <GameHeader />
      <MCQuiz />

      <div className="mt-4 flex justify-end">
        {isNextShown && (
          <Button onClick={handleNext} className="" disabled={isChecking}>
            {isChecking ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Next <ChevronRight size={20} strokeWidth={1.5} />
              </>
            )}
          </Button>
        )}
        {!isNextShown && <Button onClick={handleSubmit}>Submit</Button>}
      </div>
    </div>
  )
}

export { MCQGame }
