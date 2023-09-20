import { badgeVariants } from "@/components/ui"
import { cn } from "@/lib/utils"
import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { FC } from "react"

type PageHeaderProps = {
  title: string
}

const PageHeader: FC<PageHeaderProps> = ({ title }) => {
  return (
    <header className="mt-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Link
        href="/dashboard"
        className={cn(
          badgeVariants({ variant: "default" }),
          "px-x flex items-center gap-2 py-1 text-sm",
        )}
      >
        <LayoutDashboard size={18} />
        <p>Back to Dashboard</p>
      </Link>
    </header>
  )
}

export { PageHeader }
