import Image from "next/image"
import { FC } from "react"
import { PickedUser } from "../common"
type UserAvatarProps = {
  user: PickedUser
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  const placeholder = user.name ? user.name[0].toUpperCase() : "U"

  return user.image ? (
    <Image
      src={user.image}
      width={40}
      height={40}
      alt="User"
      className="h-10 w-10 rounded-full"
    />
  ) : (
    <div className="h-10 w-10 rounded-full bg-gray-600 text-white">
      {placeholder}
    </div>
  )
}

export { UserAvatar }
