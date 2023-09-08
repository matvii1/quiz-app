import { FC } from "react"

type MCGameProps = {
  params: {
    gameId: string
  }
}

const MCGame: FC<MCGameProps> = ({ params }) => {
  return <main className="container">page {JSON.stringify(params.gameId)}</main>
}

export default MCGame
