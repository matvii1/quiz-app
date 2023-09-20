"use client"

import { Badge } from "@/components/ui"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Github, Send } from "lucide-react"
import Link from "next/link"
import { FC } from "react"

const buildWith = [
  "Next.js",
  "Prisma",
  "Planet Scale",
  "React Query",
  "Tailwind",
  "Open AI",
  "NextAuth",
  "Typescript",
]

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
                {buildWith.map((item) => (
                  <li key={item} className="flex items-center">
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export { DescDialog }
