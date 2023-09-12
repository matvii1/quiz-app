"use client"

import { api } from "@/app/axios"
import { Button } from "@/components/ui"
import { ChevronRight, Loader2 } from "lucide-react"
import { FC, useCallback, useEffect } from "react"
import { useMutation } from "react-query"
import { z } from "zod"
import { MCQuiz } from "."
import { GameHeader } from ".."
import { checkAnswerSchema } from "../../../quiz/schemas"
import { useKeyboradNavigation } from "../../hooks"
import { useMSQContext } from "../../providers/mcq"
import EndGame from "../EndGame"

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
    setHasEnded,
    game,
    hasEnded,
    isLastQuestion,
    questionsLength,
    topic,
    statistics,
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
      return
    }

    if (timer > 0) {
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
        setHasEnded(true)

        return
      }

      next()
    }
  }, [
    checkAnswer,
    setStatistics,
    next,
    isLastQuestion,
    setHasEnded,
    resetTimer,
    selectedOptionIndex,
    setSelectedOptionIndex,
    timer,
  ])

  const handleSubmit = useCallback(() => {
    if (selectedOptionIndex == null) return

    handleNext()
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
    return <EndGame gameId={game.id} timeStarted={game.timeStarted} />
  }

  return (
    <div className="w-[90%] md:w-[700px]">
      <GameHeader
        type="multiple-choice"
        timer={timer}
        topic={topic}
        statistics={statistics}
      />
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
