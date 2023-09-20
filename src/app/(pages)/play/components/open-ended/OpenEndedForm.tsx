import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@/components/ui"
import { ChevronRight, Loader2 } from "lucide-react"
import { FC, useEffect, useRef } from "react"
import { OpenEndedAnswerSchemaType, OpenEndedForm } from "../../types"

type OpenEndedFormProps = {
  form: OpenEndedForm
  handleNext: (values: OpenEndedAnswerSchemaType) => void
  isChecking: boolean
  isNextShown: boolean
  isLoadingGameEnd: boolean
}

const OpenEndedForm: FC<OpenEndedFormProps> = ({
  form,
  isChecking,
  isNextShown,
  handleNext,
  isLoadingGameEnd,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [handleNext])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleNext)}>
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4 text-xl">Enter your answer</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  ref={ref}
                  placeholder="Enter your answer here..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 flex justify-end">
          <Button disabled={isChecking || isLoadingGameEnd} type="submit">
            {isChecking || isLoadingGameEnd ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                {isNextShown ? "Next" : "Submit"}
                <ChevronRight size={20} strokeWidth={1.5} />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { OpenEndedForm }
