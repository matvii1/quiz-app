import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions, DefaultSession, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./db"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token }) => {
      const db_user = await prisma.user.findFirst({
        where: {
          email: token.email!,
        },
      })

      if (db_user) {
        token.id = +db_user.id
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.picture
      }

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
}

export const getAuthSession = () => {
  return getServerSession(authOptions)
}
