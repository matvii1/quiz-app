"use client"

import { Button, Form } from "@/components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { formSchema } from "../schemas"
import { FormSchemaType } from "../types"
import { AmountField, ControlsField, TopicField } from "./Fields"

const QuizCreationForm: FC = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      amount: 10,
      type: "multiple_choice",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[300px] flex-col gap-3 sm:w-[360px]"
      >
        <TopicField form={form} />
        <AmountField form={form} />
        <ControlsField form={form} />

        <Button type="submit" className="mt-4 py-6">
          Create
        </Button>
      </form>
    </Form>
  )
}

export { QuizCreationForm }
