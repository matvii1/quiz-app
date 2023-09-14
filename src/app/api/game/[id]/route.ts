import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

type Response = {
  params: {
    id: string
  }
}
export const GET = async (req: Request, res: Response) => {
  try {
    const id = res.params.id

    const game = await prisma.game.findUnique({
      where: {
        id,
      },
    })

    return NextResponse.json({
      game,
    })
  } catch (error) {
    return NextResponse.json({
      error: JSON.stringify(error, null, 2),
    })
  }
}
