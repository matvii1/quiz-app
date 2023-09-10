import { checkAnswerSchema } from "@/app/(pages)/quiz/schemas"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json()

    const { questionId, answer } = checkAnswerSchema.parse(body)

    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    })

    if (!question) {
      return NextResponse.json(
        {
          error: "Question not found",
        },
        {
          status: 404,
        },
      )
    }

    await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        userAnswer: answer,
      },
    })

    if (question?.questionType === "multiple_choice") {
      const isCorrect =
        question.answer.toLowerCase().trim() === answer.toLowerCase().trim()

      if (isCorrect) {
        await prisma.question.update({
          where: {
            id: questionId,
          },
          data: {
            isCorrect: true,
          },
        })

        return NextResponse.json(
          {
            correct: true,
          },
          {
            status: 200,
          },
        )
      }

      if (!isCorrect) {
        await prisma.question.update({
          where: {
            id: questionId,
          },
          data: {
            isCorrect: false,
          },
        })

        return NextResponse.json(
          {
            correct: false,
          },
          {
            status: 200,
          },
        )
      }
    }

    return NextResponse.json(
      {
        error: "Question type not supported",
      },
      {
        status: 400,
      },
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        errors: error.issues,
      })
    }
  }

  return NextResponse.json(
    {
      error: "Somwthing went wrong",
    },
    {
      status: 500,
    },
  )
}
