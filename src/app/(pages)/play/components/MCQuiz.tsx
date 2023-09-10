"use client"

import { Card, CardDescription, CardHeader } from "@/components/ui"
import { FC } from "react"
import { OptionCard } from "."
import { useMSQContext } from "../providers"

const MCQuiz: FC = () => {
  const {
    currentQuestion: question,
    questionsLength,
    questionIndex,
    options,
  } = useMSQContext()

  return (
    <div>
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center gap-6 text-muted-foreground">
          <div className="flex flex-col items-center">
            <div className="font-bold text-primary">{questionIndex + 1}</div>
            <span className="rotate-[10deg h-[1px] w-4 bg-muted-foreground"></span>
            <div>{questionsLength}</div>
          </div>
          <CardDescription>{question.question}</CardDescription>
        </CardHeader>
      </Card>

      <ul className="mt-4 flex flex-col items-center gap-3">
        {options.map((option, index) => (
          <OptionCard key={index} option={option} index={index} />
        ))}
      </ul>
    </div>
  )
}

export { MCQuiz }
