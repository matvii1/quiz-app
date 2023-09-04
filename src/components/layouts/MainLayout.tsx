import { FC, ReactNode } from "react"
import { Navbar } from "../common"

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export { MainLayout }
