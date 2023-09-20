"use client"

import { checkAnswerSchema } from "@/app/(pages)/quiz/schemas"
import { api } from "@/app/axios"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { z } from "zod"
import { OpenEndedForm, OpenEndedQuiz } from "."
import { GameHeader } from ".."
import { useOpenEndedContext } from "../../providers"
import { openEndedAnswerSchema } from "../../schemas"
import { EndGameSchemaType, OpenEndedAnswerSchemaType } from "../../types"
import EndGame from "../EndGame"

const OpenEndedGame: FC = () => {
  const {
    isNextShown,
    next,
    timer,
    currentQuestion,
    stopTimer,
    setStatistics,
    resetTimer,
    setHasEnded,
    game,
    hasEnded,
    isLastQuestion,
    topic,
    statistics,
  } = useOpenEndedContext()

  const {
    data,
    mutate: endGame,
    isLoading: isLoadingGameEnd,
  } = useMutation({
    mutationFn: async () => {
      const payload: EndGameSchemaType = {
        gameId: game.id,
      }

      const { data } = await api.post<{ endTime: Date }>(
        "/api/gameEnd",
        payload,
      )

      return data
    },
  })

  const form = useForm<OpenEndedAnswerSchemaType>({
    resolver: zodResolver(openEndedAnswerSchema),
    defaultValues: {
      answer: "",
    },
  })

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async (answer: string) => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        answer: answer,
        questionId: currentQuestion.id,
      }

      return api.post<{ percentageCorrect: number }>(
        "/api/checkAnswer",
        payload,
      )
    },
  })

  const handleNext = (values: OpenEndedAnswerSchemaType) => {
    if (isLastQuestion) {
      stopTimer()

      endGame(undefined, {
        onSuccess: () => {
          checkAnswersNext(values)
        },
        onError: () => {
          toast({
            title: "Can't load the statistics",
            description: "Please try again later.",
          })
        },
      })

      return
    }

    checkAnswersNext(values)
  }

  useEffect(() => {
    if (!hasEnded && timer === 0) {
      toast({
        title: "Time's up",
        description: "You ran out of time. You can still submit your answer.",
        variant: "destructive",
      })

      if (isLastQuestion) {
        setHasEnded(true)
        return
      }
    }
  }, [
    timer,
    isLastQuestion,
    next,
    resetTimer,
    setHasEnded,
    setStatistics,
    hasEnded,
  ])

  function checkAnswersNext(values: OpenEndedAnswerSchemaType) {
    checkAnswer(values.answer, {
      onSuccess: ({ data: { percentageCorrect } }) => {
        toast({
          title: "Similarity",
          description: `You got ${Math.round(percentageCorrect)}% correct`,
        })

        resetTimer()

        if (isLastQuestion) {
          setHasEnded(true)

          return
        }

        form.reset()
        next()
      },
      onError: () => {
        stopTimer()

        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        })
      },
    })
  }

  if (hasEnded) {
    return <EndGame gameId={game.id} />
  }

  return (
    <div className="w-[90%] md:w-[700px]">
      <GameHeader
        type="open_ended"
        timer={timer}
        topic={topic}
        statistics={statistics}
      />
      <OpenEndedQuiz />

      <OpenEndedForm
        handleNext={handleNext}
        form={form}
        isChecking={isChecking}
        isNextShown={isNextShown}
        isLoadingGameEnd={isLoadingGameEnd}
      />
    </div>
  )
}

export { OpenEndedGame }
