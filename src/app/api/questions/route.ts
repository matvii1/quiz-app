import { formSchema } from "@/app/(pages)/quiz/schemas"
import { strict_output } from "@/lib/gpt"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json()
    const { amount, topic, type } = formSchema.parse(body)
    let questions: any

    switch (type) {
      case "open_ended":
        questions = await strict_output(
          `You are a helpful AI that creates quizes and that is able to generate a pair of questions and answers. The length of the answer should not exeed 20 words. Store all the question and answers in a JSON array.`,
          new Array(amount).fill(
            `You need to generate a random hard open-ended question about the ${topic}`,
          ),
          {
            question: "question",
            answer: "answer with max length of 20 words",
          },
        )

        break

      case "multiple_choice":
        questions = await strict_output(
          `You are a helpful AI that creates quizes and that is able to generate a pair of questions and answers. The length of the answer should not exeed 20 words. There will be three options which are all incorrect. The correct answer should be in the 'answer' field. Store all the question and answers in a JSON array.`,
          new Array(amount).fill(
            `You need to generate a random hard multiple choice question about the ${topic}`,
          ),
          {
            question: "question",
            answer:
              "answer with max length of 20 words. The answer should be one of the following options.",
            option1: "1st optiion with max length of 20 words",
            option2: "2st optiion with max length of 20 words",
            option3: "3st optiion with max length of 20 words",
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
