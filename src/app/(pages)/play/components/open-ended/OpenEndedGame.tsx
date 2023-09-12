"use client"

import { Button } from "@/components/ui"
import { ChevronRight, Loader2 } from "lucide-react"
import { FC, useCallback, useEffect } from "react"
import { useMutation } from "react-query"
import { OpenEndedQuiz } from "."
import { GameHeader } from ".."
import { useOpenEndedContext } from "../../providers"
import EndGame from "../EndGame"

const OpenEndedGame: FC = () => {
  const {
    isNextShown,
    next,
    timer,
    currentQuestion,
    setStatistics,
    resetTimer,
    questionIndex,
    setHasEnded,
    game,
    hasEnded,
    isLastQuestion,
    questionsLength,
    topic,
    statistics,
  } = useOpenEndedContext()

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    // mutationFn: () => {
    // const payload: z.infer<typeof checkAnswerSchema> = {
    //   answer: ''
    // }
    // return api.post(`/api/checkAnswer`, payload)
    // },
  })

  const handleNext = useCallback(() => {
    // TODO: check if answer exists

    if (timer > 0) {
      checkAnswer(undefined, {})
    }

    if (timer === 0) {
      setStatistics((prev) => ({
        ...prev,
        wrongCount: prev.wrongCount + 1,
      }))

      resetTimer()

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
    timer,
  ])

  const handleSubmit = useCallback(() => {
    // TODO: check if answer exists

    handleNext()
  }, [handleNext])

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
      <GameHeader type='open_ended' timer={timer} topic={topic} statistics={statistics} />
      <OpenEndedQuiz />

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

export { OpenEndedGame }
