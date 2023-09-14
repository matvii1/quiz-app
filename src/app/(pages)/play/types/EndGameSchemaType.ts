import { z } from "zod"
import { endGameSchema } from "../schemas"

export type EndGameSchemaType = z.infer<typeof endGameSchema>
