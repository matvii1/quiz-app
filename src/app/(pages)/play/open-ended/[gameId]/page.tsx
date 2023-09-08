import { FC } from "react"

type OpenEnedGameProps = {
  params: {
    gameId: string
  }
}

const OpenEndedGame: FC<OpenEnedGameProps> = ({ params }) => {
  return <main className="container">page {params.gameId}</main>
}

export default OpenEndedGame
