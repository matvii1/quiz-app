import { FC } from "react"
import { QuizCreationForm } from "./components"

export const metadata = {
  title: "Quizzz",
  description: "Quiz page",
}

const Quiz: FC = async () => {
  return (
    <main className="container flex flex-1 items-center justify-center">
      <QuizCreationForm />
    </main>
  )
}

export default Quiz
