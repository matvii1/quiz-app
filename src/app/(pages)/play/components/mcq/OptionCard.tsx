import { Button } from "@/components/ui"
import { FC } from "react"
import { useMSQContext } from "../../providers/mcq"

type OptionCardProps = {
  option: string
  index: number
}

const OptionCard: FC<OptionCardProps> = ({ option, index }) => {
  const { selectedOptionIndex, handleSelect } = useMSQContext()

  return (
    <li key={option} className="w-full">
      <Button
        className="duration-[0.1s] inline-block h-full w-full p-6"
        variant={selectedOptionIndex === index ? "default" : "outline"}
        onClick={() => handleSelect(index)}
      >
        <div className="flex flex-row items-center gap-4">
          <div className="rounded-md border p-4 py-2">{index + 1}</div>
          <p>{option}</p>
        </div>
      </Button>
    </li>
  )
}

export { OptionCard }
