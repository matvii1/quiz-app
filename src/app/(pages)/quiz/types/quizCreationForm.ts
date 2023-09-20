import { UseFormReturn } from "react-hook-form"
import {} from "."
import { QuizCreationSchemaType } from "./quizCreationSchema"

export type QuizCreationFormType = UseFormReturn<
  QuizCreationSchemaType,
  any,
  undefined
>
