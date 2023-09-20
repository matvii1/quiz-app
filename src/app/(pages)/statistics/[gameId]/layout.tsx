import { PageHeader } from "@/components/common"
import { FC, ReactNode } from "react"

type StatisticsLayoutProps = {
  children: ReactNode
}

const StatisticsLayout: FC<StatisticsLayoutProps> = ({ children }) => {
  return (
    <main className="container flex-1">
      <PageHeader title="Summary" />
      {children}
    </main>
  )
}

export default StatisticsLayout
