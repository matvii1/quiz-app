"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  UserAvatar,
} from "@/components/ui"
import { PickedUser } from "@/types"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { FC } from "react"

type UserDropDownProps = {
  user: PickedUser
}

const UserDropDown: FC<UserDropDownProps> = ({ user }) => {
  async function handleSignOut() {
    await signOut().catch(console.error)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem] max-w-[16rem]">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <p className="truncate font-bold">{user.name}</p>
            <p className="truncate text-sm text-gray-400">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="mt-2 justify-center hover:bg-red-400"
        >
          <p className="flex items-center text-red-400">
            <span className="mr-2">Sign out</span>
            <LogOut width={17} />
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserDropDown }
