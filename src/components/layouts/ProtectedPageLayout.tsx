import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC, ReactNode } from "react"

type ProtectedPageLayoutProps = {
  children: ReactNode
}

const ProtectedPageLayout: FC<ProtectedPageLayoutProps> = async ({
  children,
}) => {
  const session = await getAuthSession()

  if (!session?.user) {
    return redirect("/")
  }

  return <>{children}</>
}

export { ProtectedPageLayout }
