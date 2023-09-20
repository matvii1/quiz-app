import { buttonVariants } from "@/components/ui"
import { cn } from "@/lib/utils"
import { Game } from "@prisma/client"
import { BrainCircuit, Clock10 } from "lucide-react"
import Link from "next/link"
import { FC } from "react"

type RecentActivityItemProps = {
  game: Game
}

const RecentActivityItem: FC<RecentActivityItemProps> = ({ game }) => {
  const timeStarted = new Date(game.timeStarted)
  const formattedTime = new Intl.DateTimeFormat("en-US").format(timeStarted)
  const gameTypeText =
    game.gameType === "open_ended" ? "Open Ended" : "Multiple Choice"
  const statisticsHref = `/statistics/${game.id}`

  return (
    <div className="flex items-center gap-6">
      <BrainCircuit size={24} strokeWidth={2.5} />

      <div className="flex flex-col items-start gap-2">
        <Link
          href={statisticsHref}
          className="text-sm underline underline-offset-4"
        >
          {game.topic}
        </Link>

        <Link
          href={statisticsHref}
          className={cn(
            buttonVariants({
              size: "xs",
            }),
            "gap-2",
          )}
        >
          <Clock10 size={12} strokeWidth={2.5} />
          <p>{formattedTime}</p>
        </Link>
        <p className="text-xs text-muted-foreground">{gameTypeText}</p>
      </div>
    </div>
  )
}

export { RecentActivityItem }
