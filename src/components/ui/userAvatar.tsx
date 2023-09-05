import { PickedUser } from "@/types"
import Image from "next/image"
import { FC } from "react"

type UserAvatarProps = {
  user: PickedUser
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  const placeholder = user.name ? user.name[0].toUpperCase() : "U"

  return user.image ? (
    <div className="relative h-10 w-10">
      <Image fill src={user.image} alt="User" className="rounded-full" />
    </div>
  ) : (
    <div className="h-10 w-10 rounded-full bg-gray-600 text-white">
      {placeholder}
    </div>
  )
}

export { UserAvatar }
