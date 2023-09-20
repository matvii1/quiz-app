"use client"

import { FC } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui"
import { Github, Send, User2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const DescDialog: FC = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Badge className="mt-6 cursor-pointer py-1">What is this?</Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Welcome to Quizmify!
          </DialogTitle>

          <div className=" mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Github size={16} />
              <Link
                href="https://github.com/matvii1"
                target="_blank"
                className="underline underline-offset-2"
              >
                GitHub
              </Link>
            </div>
            <div className="flex items-center">
              <Send size={16} />
              <Link
                target="_blank"
                href="https://t.me/matvii_1"
                className="underline underline-offset-2"
              >
                Telegram
              </Link>
            </div>
          </div>
          <DialogDescription className="mt-3">
            <div className="border-b-[1px] pb-2">
              🚀 Dive into a world of endless trivia powered by cutting-edge AI!
              Our quiz app generates personalized questions, adapts to your
              interests 🎯, and lets you compete globally. Click show more to
              uncover fascinating insights! 📚✨
            </div>
            <div className="mt-2 text-left">
              <h4 className="font-bold">Build with:</h4>
              <ul className="mt-2 grid list-none grid-cols-2 gap-2 font-bold sm:grid-cols-4">
                <li className="flex items-center">
                  <p>Next.js</p>
                </li>
                <li className="flex items-center">
                  <p>Prisma</p>
                </li>
                <li className="flex items-center">
                  <p>Planet Scale</p>
                </li>
                <li className="flex items-center">
                  <p>React Query</p>
                </li>
                <li className="flex items-center">
                  <p>Tailwind</p>
                </li>
                <li className="flex items-center">
                  <p>Open AI</p>
                </li>
                <li className="flex items-center">
                  <p>NextAuth</p>
                </li>
                <li className="flex items-center">
                  <p>Typescript</p>
                </li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export { DescDialog }
