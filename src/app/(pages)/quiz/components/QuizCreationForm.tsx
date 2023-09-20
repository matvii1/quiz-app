"use client"

import { api } from "@/app/axios"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  useToast,
} from "@/components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { LoadingPage } from "../../loading"
import { formSchema } from "../schemas"
import { QuizCreationSchemaType } from "../types"
import { AmountField, ControlsField, TopicField } from "./Fields"

type ApiResponse = {
  gameId: string
}

const QuizCreationForm: FC = () => {
  const searchParams = useSearchParams()
  const topic = searchParams.get("topic") || ""

  const [showLoading, setShowLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async (gameOptions: QuizCreationSchemaType) => {
      const { data } = await api.post<ApiResponse>("/api/game", gameOptions)

      return data
    },
  })

  const form = useForm<QuizCreationSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: topic,
      amount: 4,
      type: "multiple_choice",
    },
  })

  function onSubmit(gameOptions: QuizCreationSchemaType) {
    try {
      setShowLoading(true)

      getQuestions(gameOptions, {
        onSuccess: (res) => {
          const type = form.getValues("type")
          setIsSuccess(true)

          setTimeout(() => {
            if (type === "multiple_choice") {
              router.push(`/play/mcq/${res.gameId}`)
            }

            if (type === "open_ended") {
              router.push(`/play/open-ended/${res.gameId}`)
            }

            form.reset()
          }, 1000)
        },
        onError: (err) => {
          setShowLoading(false)
          toast({
            title: "Something went wrong",
            description: "Ai could not create a quiz. Please try again later.",
            variant: "destructive",
          })
        },
      })
    } catch (error) {
      setShowLoading(false)

      form.reset()
    }
  }

  if (showLoading) {
    return <LoadingPage isDone={isSuccess} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Create a quiz</CardTitle>
        <CardDescription>Choose a topic</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}

export { QuizCreationForm }
