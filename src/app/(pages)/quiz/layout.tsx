import { ProtectedPageLayout } from "@/components/layouts"
import { FC, ReactNode } from "react"

type QuizPageLayoutProps = {
  children: ReactNode
}

const QuizPageLayout: FC<QuizPageLayoutProps> = ({ children }) => {
  return <ProtectedPageLayout>{children}</ProtectedPageLayout>
}

export default QuizPageLayout
