import { z } from "zod"

export const formSchema = z.object({
  topic: z
    .string()
    .min(4, {
      message: "Topic must be at least 4 characters long",
    })
    .max(50, {
      message: "Topic must be at most 50 characters long",
    }),
  amount: z.number().min(2).max(50),
  type: z.enum(["multiple_choice", "open_ended"]),
})
