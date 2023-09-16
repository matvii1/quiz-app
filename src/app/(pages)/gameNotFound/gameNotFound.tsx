import { Search } from "lucide-react"
import { FC } from "react"

const GameNotFound: FC = () => {
  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="flex items-center gap-2 font-bold">
        <Search size={18} /> <p>Game does not exist {": ("}</p>
      </div>
    </main>
  )
}

export { GameNotFound }
