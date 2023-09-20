import { ProtectedPageLayout } from "@/components/layouts"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { FC, ReactNode } from "react"

type DashboardLayoutProps = {
  children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  return <ProtectedPageLayout>{children}</ProtectedPageLayout>
}

export default DashboardLayout
