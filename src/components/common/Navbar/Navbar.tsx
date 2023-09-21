import { Logo } from "@/components/ui"
import { getAuthSession } from "@/lib/nextAuth"
import { FC } from "react"
import { SignInButton, ThemeDropdown, UserDropDown } from "./components"

const Navbar: FC = async () => {
  const session = await getAuthSession()

  return (
    <>
      <header className="inset-x-0 top-0 z-10 h-fit border bg-background py-4">
        <div className="container flex h-full items-center justify-between">
          <Logo />

          <div className="flex items-center gap-6">
            <ThemeDropdown />

            {session?.user ? (
              <UserDropDown user={session.user} />
            ) : (
              <SignInButton text="Sign In" />
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export { Navbar }
