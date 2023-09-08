import { z } from "zod"

const topicConstraint = {
  minLength: 3,
  maxLength: 15,
}

const amountConstraint = {
  min: 2,
  max: 7,
}

export const formSchema = z.object({
  topic: z
    .string()
    .min(topicConstraint.minLength, {
      message: `Topic must be at least ${topicConstraint.minLength} characters long`,
    })
    .max(topicConstraint.maxLength, {
      message: `Topic must be at most ${topicConstraint.maxLength} characters long`,
    }),
  amount: z.number().min(amountConstraint.min).max(amountConstraint.max),
  type: z.enum(["multiple_choice", "open_ended"]),
})
