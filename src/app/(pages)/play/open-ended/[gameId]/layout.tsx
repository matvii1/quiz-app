import { ProtectedPageLayout } from "@/components/layouts"
import { FC, ReactNode } from "react"

type OpenEndedGameLayoutProps = {
  children: ReactNode
}

const OpenEndedGameLayout: FC<OpenEndedGameLayoutProps> = ({ children }) => {
  return <ProtectedPageLayout>{children}</ProtectedPageLayout>
}

export default OpenEndedGameLayout
