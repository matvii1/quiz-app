import { z } from "zod"
import { formSchema } from "../schemas"

export type QuizCreationSchemaType = z.infer<typeof formSchema>
