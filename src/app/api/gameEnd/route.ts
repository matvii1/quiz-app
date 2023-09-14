import { endGameSchema } from "@/app/(pages)/play/schemas"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json()
    const { gameId } = endGameSchema.parse(body)

    console.log(gameId)

    const game = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeEnded: new Date(),
      },
    })

    return NextResponse.json({
      endTime: game.timeEnded,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: "Something went wrong!",
      },
      { status: 400 },
    )
  }
}
