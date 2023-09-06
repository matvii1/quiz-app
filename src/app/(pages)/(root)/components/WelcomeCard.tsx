import { SignInButton } from "@/components/common/Navbar/components"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { FC } from "react"

const WelcomeCard: FC = () => {
  return (
    <Card className="min-w-[250px] max-w-[300px]">
      <CardHeader>
        <CardTitle>Welcome to Quizzz</CardTitle>
        <CardDescription>
          Quizzz is the app that allows you to create and share quizzes with
          your friends.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-2">
        <SignInButton text="Sign in wigth Google!" />
      </CardContent>
    </Card>
  )
}

export { WelcomeCard }
