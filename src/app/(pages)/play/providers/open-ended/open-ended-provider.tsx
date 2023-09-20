"use client"

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"
import { OpenEndedContextType, PickedOpenEndedGame } from "."
import { StatisticType } from ".."
import { useTimer } from "../../hooks"
import { useQuestion } from "../../hooks/useQuestions"

type OpenEndedProviderProps = {
  children: ReactNode
  game: PickedOpenEndedGame
}

const OpenEndedContext = createContext<OpenEndedContextType>(
  {} as OpenEndedContextType,
)
export const useOpenEndedContext = () => useContext(OpenEndedContext)

const OpenEndedProvider: FC<OpenEndedProviderProps> = ({ children, game }) => {
  const questionsLength = game.questions.length
  const [hasEnded, setHasEnded] = useState(false)
  const [statistics, setStatistics] = useState<StatisticType>({
    wrongCount: 0,
    correctCount: 0,
  })

  useLayoutEffect(() => {
    if (game.timeEnded) {
      setHasEnded(true)
    }
  }, [setHasEnded, game.timeEnded])

  const { timer, resetTimer, stopTimer } = useTimer()
  const { questionIndex, next, isNextShown } = useQuestion(questionsLength)

  const isLastQuestion = questionIndex === questionsLength - 1

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex]
  }, [questionIndex, game.questions])

  const value = {
    game,
    questionIndex,
    currentQuestion,
    questionsLength,
    timer,
    resetTimer,
    topic: game.topic,
    isNextShown,
    next,
    setHasEnded,
    hasEnded,
    isLastQuestion,
    statistics,
    setStatistics,
    stopTimer,
  }

  return (
    <OpenEndedContext.Provider value={value}>
      {children}
    </OpenEndedContext.Provider>
  )
}

export { OpenEndedProvider }
