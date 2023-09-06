import { FC, ReactNode } from "react"
import { Navbar } from "../common"

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />

      <main className="flex-1">{children}</main>
    </>
  )
}

export { MainLayout }
