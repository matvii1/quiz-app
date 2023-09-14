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
import { MSQContextType, PickedMCQGame, StatisticType } from "."
import { useTimer } from "../../hooks"
import { useQuestion } from "../../hooks/useQuestions"

type MCQuizProviderProps = {
  children: ReactNode
  game: PickedMCQGame
}

const MSQContext = createContext<MSQContextType>({} as MSQContextType)
export const useMSQContext = () => useContext(MSQContext)

const MCQuizProvider: FC<MCQuizProviderProps> = ({ children, game }) => {
  const questionsLength = game.questions.length
  // TODO: add useeffect that sets has Ended to true

  const [statistics, setStatistics] = useState<StatisticType>({
    wrongCount: 0,
    correctCount: 0,
  })
  const [hasEnded, setHasEnded] = useState(false)

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  )

  useLayoutEffect(() => {
    if (game.timeEnded) {
      setHasEnded(true)
    }
  }, [setHasEnded, game.timeEnded])

  const { timer, resetTimer, stopTimer } = useTimer()
  const { questionIndex, next, isNextShown } = useQuestion(questionsLength)

  const isLastQuestion = questionIndex === questionsLength - 1

  function handleSelect(index: number) {
    setSelectedOptionIndex(index)
  }

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex]
  }, [questionIndex, game.questions])

  const options = useMemo(() => {
    if (!currentQuestion) return []
    if (!currentQuestion.options) return []

    return currentQuestion.options as string[]
  }, [currentQuestion])

  const value = {
    game,
    statistics,
    setStatistics,
    questionIndex,
    currentQuestion,
    questionsLength,
    options,
    selectedOptionIndex,
    handleSelect,
    timer,
    resetTimer,
    topic: game.topic,
    isNextShown,
    setSelectedOptionIndex,
    next,
    setHasEnded,
    hasEnded,
    isLastQuestion,
    stopTimer
  }

  return <MSQContext.Provider value={value}>{children}</MSQContext.Provider>
}

export { MCQuizProvider }
