import { Game, Question } from "@prisma/client"

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
}

export type PickedOpenEndedGame = Game & {
  questions: Pick<Question, "id" | "question" | "answer">[]
}
