import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { RadioGroup } from "@radix-ui/react-radio-group"
import { FC } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"

const quiz = [
  {
    question: "q1",
    options: [
      {
        answer: "q1 - 1",
        isCorrect: true,
      },
      {
        answer: "q1 -2",
        isCorrect: false,
      },
      {
        answer: "q1 - 3",
        isCorrect: false,
      },
      {
        answer: "q1 - 4",
        isCorrect: false,
      },
    ],
  },
  {
    question: "q2",
    options: [
      {
        answer: "q2 - 1",
        isCorrect: true,
      },
      {
        answer: "q2 - 2",
        isCorrect: false,
      },
      {
        answer: "q2 - 3",
        isCorrect: false,
      },
      {
        answer: "q2 - 4",
        isCorrect: false,
      },
    ],
  },
  {
    question: "q3",
    options: [
      {
        answer: "q3 - 1",
        isCorrect: true,
      },
      {
        answer: "q3 - 2",
        isCorrect: false,
      },
      {
        answer: "q3 - 3",
        isCorrect: false,
      },
      {
        answer: "q3 - 4",
        isCorrect: false,
      },
    ],
  },
]

type NodeProps = {
  question: string
  options: { answer: string; isCorrect: boolean }[]
  i: number
  form: UseFormReturn<FieldValues, any, undefined>
}

const Node: FC<NodeProps> = ({ question, options, i, form }) => {
  return (
    <Card className="w-full sm:w-[400px]">
      <CardHeader>
        <CardTitle>
          <p>Question is: </p>
          <p className="mt-2 font-bold">{question}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          key={options[0].answer}
          control={form.control}
          name={`question${i}`}
          render={({ field }) => (
            <RadioGroup
              className="flex flex-col gap-2"
              onValueChange={field.onChange}
              {...field}
            >
              <GroupItemList options={options} />
            </RadioGroup>
          )}
        />
      </CardContent>
    </Card>
  )
}

function GroupItemList({
  options,
}: {
  options: { answer: string; isCorrect: boolean }[]
}) {
  return options.map(({ answer }, i) => (
    <div className="flex items-center" key={answer}>
      <RadioGroupItem value={answer} id={answer} />
      <Label className="py-1 pl-3" htmlFor={answer}>
        {answer}
      </Label>
    </div>
  ))
}

export default Node
