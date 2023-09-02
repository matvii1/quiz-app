import { FC, ReactNode } from 'react'

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return <div className="container">{children}</div>
}

export { MainLayout }
