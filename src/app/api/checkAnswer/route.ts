import { checkAnswerSchema } from "@/app/(pages)/quiz/schemas"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { compareTwoStrings } from "string-similarity"
import { ZodError } from "zod"

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json()

    const {
      questionId,
      answer,
      isTimeUp = false,
    } = checkAnswerSchema.parse(body)

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
        userAnswer: isTimeUp ? null : answer,
      },
    })

    if (question?.questionType === "multiple_choice") {
      const isCorrect =
        question.answer.toLowerCase().trim() === answer.toLowerCase().trim()

      if (isTimeUp) {
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

    if (question.questionType === "open_ended") {
      const similarityPercentage =
        compareTwoStrings(
          answer.toLowerCase().trim(),
          question.answer.toLowerCase().trim(),
        ) * 100

      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          percentageCorrect: similarityPercentage,
        },
      })

      return NextResponse.json({
        percentageCorrect: similarityPercentage,
      })
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

    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      },
    )
  }
}
