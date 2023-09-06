import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { WelcomeCard } from "./components"

const Home: FC = async () => {
  const session = await getAuthSession()

  if (session?.user) {
    return redirect("/dashboard")
  }

  return (
    <main className="flex flex-1 items-center justify-center">
      <WelcomeCard />
    </main>
  )
}

export default Home
