import { cn } from "@/lib/utils"
import { Game } from "@prisma/client"
import { FC, HTMLAttributes } from "react"
import { RecentActivityItem } from "."

type RecentActivityListProps = {
  games: Game[]
} & HTMLAttributes<HTMLUListElement>

const RecentActivityList: FC<RecentActivityListProps> = ({
  games,
  className,
  ...props
}) => {
  return (
    <ul className={cn("flex flex-col gap-4", className)} {...props}>
      {games.map((game) => (
        <li key={game.id}>
          <RecentActivityItem game={game} />
        </li>
      ))}
    </ul>
  )
}

export { RecentActivityList }
