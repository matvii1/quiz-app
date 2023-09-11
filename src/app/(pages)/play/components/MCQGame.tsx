"use client"

import { api } from "@/app/axios"
import { Button } from "@/components/ui"
import { ChevronRight, Loader2 } from "lucide-react"
import { redirect } from "next/navigation"
import { FC, useCallback, useEffect } from "react"
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
    timer,
    currentQuestion,
    setStatistics,
    resetTimer,
    options,
    setSelectedOptionIndex,
    questionIndex,
    game,
    setHasEnded,
    hasEnded,
    isLastQuestion,
    questionsLength,
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
    if (selectedOptionIndex == null && timer > 0) {
      console.log("early")

      return
    }

    if (timer > 0) {
      console.log("timer > 0")

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

          console.log({ questionIndex, questionsLength })

          if (isLastQuestion) {
            setHasEnded(true)

            return
          }

          next()
        },
      })
    }

    if (timer === 0) {
      setStatistics((prev) => ({
        ...prev,
        wrongCount: prev.wrongCount + 1,
      }))

      resetTimer()
      setSelectedOptionIndex(null)

      console.log("timer === 0")

      if (isLastQuestion) {
        console.log("ended")
        setHasEnded(true)

        return redirect("/")
      }

      next()
    }
  }, [
    checkAnswer,
    setStatistics,
    next,
    isLastQuestion,
    setHasEnded,
    questionIndex,
    questionsLength,
    resetTimer,
    selectedOptionIndex,
    setSelectedOptionIndex,
    timer,
  ])

  const handleSubmit = useCallback(() => {
    if (selectedOptionIndex == null) return

    handleNext()

    // TODO: redirect to result page
    // return redirect("/")
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

  useEffect(() => {
    if (timer === 0) {
      handleNext()
    }
  }, [timer, handleNext])

  if (hasEnded) {
    return <div>You finished Game in 3 minutes</div>
  }

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
