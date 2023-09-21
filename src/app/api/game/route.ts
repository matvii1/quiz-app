import { formSchema } from "@/app/(pages)/quiz/schemas"
import { api } from "@/app/axios"
import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { MultipleChoiceQuestion, OpenQuestion } from "../types"

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      )
    }

    const body = await req.json()
    const { topic, amount, type } = formSchema.parse(body)

    const data = await Promise.all([
      prisma.game.create({
        data: {
          timeStarted: new Date(),
          topic,
          gameType: type,
          userId: session.user.id,
        },
      }),
      api.post("api/questions", {
        topic,
        amount,
        type,
      }),
    ])

    const game = data[0]
    const response = data[1].data

    if (!response || !response.questions || response.questions.length === 0) {
      return NextResponse.json(
        {
          message: "GPT caused issues. Please try again.",
        },
        {
          status: 500,
        },
      )
    }

    if (type === "multiple_choice") {
      await prisma.question.createMany({
        data: response.questions.map((question: MultipleChoiceQuestion) => {
          const options = [
            question.option1,
            question.option2,
            question.option3,
            question.answer,
          ]

          options.sort(() => (Math.random() > 0.5 ? 1 : -1))

          return {
            question: question.question,
            options,
            gameId: game.id,
            answer: question.answer,
            questionType: "multiple_choice",
          }
        }),
      })
    } else if (type === "open_ended") {
      await prisma.question.createMany({
        data: response.questions.map((question: OpenQuestion) => {
          return {
            question: question.question,
            answer: question.answer,
            gameId: game.id,
            questionType: "open_ended",
          }
        }),
      })
    }

    return NextResponse.json({
      gameId: game.id,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        },
      )
    } else {
      return NextResponse.json(
        {
          error: JSON.stringify(error, null, 2),
        },
        {
          status: 500,
        },
      )
    }
  }
}

export const DELETE = async (req: Request, res: Response) => {
  await prisma.game.deleteMany()
  await prisma.question.deleteMany()

  return NextResponse.json({
    message: "Deleted all games and questions",
  })
}
