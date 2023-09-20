import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { LoadingPage } from "../loading"
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
