import { cn } from "@/lib/utils"
import { FC } from "react"

type MCQTableOptionsProps = {
  options: string[]
  userAnswer: string
  answer: string
}

const MCQTableOptions: FC<MCQTableOptionsProps> = ({
  options,
  userAnswer,
  answer,
}) => {
  return (
    <div className="mt-1 flex flex-col gap-1 pl-2">
      {options &&
        options.map((option) => {
          const isCorrectOption = option === answer
          const isUserAnswer = option === userAnswer

          return (
            <div key={option} className="flex items-center">
              <p
                className={cn({
                  "font-bold text-green-600 dark:text-green-600":
                    isCorrectOption,
                  "font-bold text-red-600 dark:text-red-500":
                    isUserAnswer && !isCorrectOption,
                })}
              >
                {option}
              </p>
            </div>
          )
        })}
    </div>
  )
}

export { MCQTableOptions }
