"use client"

import { api } from "@/app/axios"
import { Button, Form, useToast } from "@/components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { formSchema } from "../schemas"
import { FormSchemaType } from "../types"
import { AmountField, ControlsField, TopicField } from "./Fields"

type ApiResponse = {
  gameId: string
}

const QuizCreationForm: FC = () => {
  const { toast } = useToast()
  const router = useRouter()
  const {
    mutate: getQuestions,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async (gameOptions: FormSchemaType) => {
      const { data } = await api.post<ApiResponse>("/api/game", gameOptions)

      return data
    },
  })

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      amount: 4,
      type: "multiple_choice",
    },
  })

  function onSubmit(gameOptions: FormSchemaType) {
    try {
      getQuestions(gameOptions, {
        onSuccess: (res) => {
          const type = form.getValues("type")

          if (type === "multiple_choice") {
            router.push(`/play/mcq/${res.gameId}`)
          }

          if (type === "open_ended") {
            router.push(`/play/open-ended/${res.gameId}`)
          }

          form.reset()
        },
        onError: (err) => {
          console.error(err)
          toast({
            title: "Something went wrong",
            description: "Ai could not create a quiz. Please try again later.",
            variant: "destructive",
          })
        },
      })
    } catch (error) {
      console.error(error)
      form.reset()
    }
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

        <Button type="submit" className="mt-4 py-6" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
        </Button>
      </form>
    </Form>
  )
}

export { QuizCreationForm }
