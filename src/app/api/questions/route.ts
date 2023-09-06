import { formSchema } from "@/app/(pages)/quiz/schemas"
import { strict_output } from "@/lib/gpt"
import { getAuthSession } from "@/lib/nextAuth"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You need to be logged in to create a quiz",
        },
        { status: 401 },
      )
    }

    const body = await req.json()
    const { amount, topic, type } = formSchema.parse(body)
    let questions: any

    switch (type) {
      case "open_ended":
        questions = await strict_output(
          `You are a helpful AI that creates quizes and that is able to generate a pair of questions and answers. The length of the answer should not exeed 40 words. Store all the question and answers in a JSON array.`,
          new Array(amount).fill(
            `You need to generate a random hard open-ended question about the ${topic}`,
          ),
          {
            question: "question",
            answer: "answer with max length of 40 words",
          },
        )

        break

      case "multiple_choice":
        questions = await strict_output(
          `You are a helpful AI that creates quizes and that is able to generate a pair of questions and answers. The length of the answer should not exeed 20 words. Store all the question and answers in a JSON array.`,
          new Array(amount).fill(
            `You need to generate a random hard multiple choice question about the ${topic}`,
          ),
          {
            question: "question",
            answer:
              "answer with max length of 20 words. The answe should be one of the following options.",
            options1: "1st optiion with max length of 20 words",
            options2: "2st optiion with max length of 20 words",
            options3: "3st optiion with max length of 20 words",
          },
        )
    }

    return NextResponse.json({ questions }, { status: 200 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        },
      )
    }
  }
}
