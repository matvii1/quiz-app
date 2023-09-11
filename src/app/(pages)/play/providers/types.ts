import { Game, Question } from "@prisma/client"
import { Dispatch, SetStateAction } from "react"

export type StatisticType = {
  wrongCount: number
  correctCount: number
}

export type MSQContextType = {
  statistics: StatisticType
  setStatistics: Dispatch<SetStateAction<StatisticType>>
  currentQuestion: Pick<Question, "options" | "id" | "question">
  questionsLength: number
  options: string[]
  selectedOptionIndex: number | null
  setSelectedOptionIndex: Dispatch<SetStateAction<number | null>>
  handleSelect: (index: number) => void
  questionIndex: number
  timer: number
  topic: string
  game: Game & { questions: Pick<Question, "id" | "question" | "options">[] }
  next: () => void
  isNextShown: boolean
  resetTimer: () => void
  hasEnded: boolean
  setHasEnded: Dispatch<SetStateAction<boolean>>
  isLastQuestion: boolean
}

export type PickedGame = Game & {
  questions: Pick<Question, "id" | "question" | "options">[]
}
