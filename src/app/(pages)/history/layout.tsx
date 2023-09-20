import { PageHeader } from "@/components/common"
import { FC, ReactNode } from "react"

type HistoryLayoutProps = {
  children: ReactNode
}

const HistoryLayout: FC<HistoryLayoutProps> = ({ children }) => {
  return (
    <main className="container flex-1">
      <PageHeader title="History" />

      {children}
    </main>
  )
}

export default HistoryLayout
