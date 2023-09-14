import { z } from "zod"
import { openEndedAsnswerSchema } from "../schemas"

export type OpenEndedAnswerSchemaType = z.infer<typeof openEndedAsnswerSchema>
