import { z } from "zod"
import { formSchema } from "../schemas"

export type FormSchemaType = z.infer<typeof formSchema>
