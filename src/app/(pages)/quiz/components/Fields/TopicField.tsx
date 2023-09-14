import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { FC } from "react"
import { QuizCreationFormType } from "../../types"

type TopicFieldProps = {
  form: QuizCreationFormType
}

const TopicField: FC<TopicFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="topic"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Topic</FormLabel>
          <FormControl>
            <Input
              placeholder="Eruopeam history..."
              {...field}
              autoComplete="off"
            />
          </FormControl>
          <FormDescription>
            You can choose a topic for your quiz
          </FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  )
}

export { TopicField }
