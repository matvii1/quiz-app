import { z } from "zod"

export const openEndedAnswerSchema = z.object({
  answer: z
    .string()
    .min(5, {
      message: "Answer must be at least 5 characters long",
    })
    .max(1000, {
      message: "Answer must be less than 1000 characters long",
    }),
})
