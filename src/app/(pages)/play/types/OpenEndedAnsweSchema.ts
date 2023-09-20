import { z } from "zod"
import { openEndedAnswerSchema } from "../schemas"

export type OpenEndedAnswerSchemaType = z.infer<typeof openEndedAnswerSchema>
