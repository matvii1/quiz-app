import { PageHeader } from "@/components/common"
import { ProtectedPageLayout } from "@/components/layouts"
import { FC, ReactNode } from "react"

type HistoryLayoutProps = {
  children: ReactNode
}

const HistoryLayout: FC<HistoryLayoutProps> = ({ children }) => {
  return (
    <ProtectedPageLayout>
      <main className="container flex-1">
        <PageHeader title="History" />

        {children}
      </main>
    </ProtectedPageLayout>
  )
}

export default HistoryLayout
