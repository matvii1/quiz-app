import { ProtectedPageLayout } from "@/components/layouts"
import { FC, ReactNode } from "react"

type MCQGameLayoutProps = {
  children: ReactNode
}

const MCQGameLayout: FC<MCQGameLayoutProps> = ({ children }) => {
  return <ProtectedPageLayout>{children}</ProtectedPageLayout>
}

export default MCQGameLayout
