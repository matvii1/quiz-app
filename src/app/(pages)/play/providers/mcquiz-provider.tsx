"use client"

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react"
import { MSQContextType, PickedGame, StatisticType } from "."
import { useTimer } from "../hooks"
import { useQuestion } from "../hooks/useQuestions"

type MCQuizProviderProps = {
  children: ReactNode
  game: PickedGame
}

const MSQContext = createContext<MSQContextType>({} as MSQContextType)
export const useMSQContext = () => useContext(MSQContext)

const MCQuizProvider: FC<MCQuizProviderProps> = ({ children, game }) => {
  const questionsLength = game.questions.length

  const [statistics, setStatistics] = useState<StatisticType>({
    wrongCount: 0,
    correctCount: 0,
  })
  const [hasEnded, setHasEnded] = useState(false)

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  )

  const { timer, resetTimer } = useTimer()
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
  }

  return <MSQContext.Provider value={value}>{children}</MSQContext.Provider>
}

export { MCQuizProvider }
