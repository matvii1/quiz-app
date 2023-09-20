import { PageHeader } from "@/components/common"
import { ProtectedPageLayout } from '@/components/layouts'
import { FC, ReactNode } from "react"

type StatisticsLayoutProps = {
  children: ReactNode
}

const StatisticsLayout: FC<StatisticsLayoutProps> = ({ children }) => {
  return (
    <ProtectedPageLayout>
      <main className="container flex-1">
        <PageHeader title="Summary" />
        {children}
      </main>
    </ProtectedPageLayout>
  )
}

export default StatisticsLayout
