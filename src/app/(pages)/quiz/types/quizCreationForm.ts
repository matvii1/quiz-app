import { UseFormReturn } from "react-hook-form"
import { QuizCreationSchemaType } from "."

export type QuizCreationFormType = UseFormReturn<
  QuizCreationSchemaType,
  any,
  undefined
>
