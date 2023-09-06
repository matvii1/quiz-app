import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { QuizCreationForm } from "./components"

export const metadata = {
  title: "Quiz | Quizmify",
  description: "Quiz page",
}

const Quiz: FC = async () => {
  const session = await getAuthSession()

  if (!session?.user) {
    return redirect("/")
  }

  return (
    <main className="container flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Create a quiz</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
          <QuizCreationForm />
        </CardContent>
      </Card>
    </main>
  )
}

export default Quiz
