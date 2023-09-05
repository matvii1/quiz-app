import { User } from "next-auth"

export type PickedUser = Pick<User, "email" | "image" | "name">
