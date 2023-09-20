import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"
import { FC, ReactNode } from "react"

type ToolTipProps = {
  label: string
  children: ReactNode
}

const ToolTip: FC<ToolTipProps> = ({ label, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { ToolTip }
