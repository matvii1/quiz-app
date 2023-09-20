import Link from "next/link"
import { FC } from "react"

const Logo: FC = () => {
  return (
    <Link
      href="/"
      className="cursor-pointer rounded-lg border border-b-4 border-r-4 border-primary p-2 font-bold  transition-transform hover:-translate-y-[2px]"
    >
      Quizzz
    </Link>
  )
}
export { Logo }
