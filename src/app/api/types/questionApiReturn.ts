export type OpenQuestion = {
  question: string
  answer: string
}

export type MultipleChoiceQuestion = OpenQuestion & {
  option1: string
  option2: string
  option3: string
}

export type QuestionApiReturn = {
  questions: OpenQuestion[] | MultipleChoiceQuestion[]
}
