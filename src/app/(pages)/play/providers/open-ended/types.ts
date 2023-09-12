import { Game, Question } from "@prisma/client"
import { StatisticType } from '..'

export type OpenEndedContextType = {
  game: PickedOpenEndedGame
  questionIndex: number
  currentQuestion: Pick<Question, "id" | "question" | "answer">
  questionsLength: number
  timer: number
  resetTimer: () => void
  topic: string
  isNextShown: boolean
  next: () => void
  setHasEnded: React.Dispatch<React.SetStateAction<boolean>>
  hasEnded: boolean
  isLastQuestion: boolean
  statistics: StatisticType
  setStatistics: React.Dispatch<React.SetStateAction<StatisticType>>
}

export type PickedOpenEndedGame = Game & {
  questions: Pick<Question, "id" | "question" | "answer">[]
}
