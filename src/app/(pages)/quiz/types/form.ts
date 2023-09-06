import { UseFormReturn } from "react-hook-form"
import { FormSchemaType } from "."

export type Form = UseFormReturn<FormSchemaType, any, undefined>
