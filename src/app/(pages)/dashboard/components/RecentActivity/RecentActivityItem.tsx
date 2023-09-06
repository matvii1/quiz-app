import { Button } from "@/components/ui"
import { BrainCircuit, Clock10 } from "lucide-react"
import Link from "next/link"
import { FC } from "react"

type RecentActivityItemProps = {
  linkText: string
}

const RecentActivityItem: FC<RecentActivityItemProps> = ({ linkText }) => {
  return (
    <div className="flex items-center gap-6">
      <BrainCircuit size={24} strokeWidth={2.5} />

      <div className="flex flex-col items-start gap-3">
        <Link href="#" className="text-sm underline underline-offset-4">
          {linkText}
        </Link>

        <Button className="gap-2" size="xs">
          <Clock10 size={12} strokeWidth={2.5} />
          <p>12 / 12 / 2021</p>
        </Button>
        <p className="text-xs text-muted-foreground">Multiple choice</p>
      </div>
    </div>
  )
}

export { RecentActivityItem }
