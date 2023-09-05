import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC } from "react"
import { WelcomeCard } from "./components"

const Home: FC = async () => {
  const session = await getAuthSession()

  if (session?.user) {
    return redirect("/dashboard")
  }

  return <WelcomeCard />
}

export default Home
