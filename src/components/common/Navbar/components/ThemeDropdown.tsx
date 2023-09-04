"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"

import { useTheme } from "next-themes"
import { FC } from "react"

const ThemeDropdown: FC = () => {
  const { setTheme } = useTheme()

  function handleSwitchLight() {
    setTheme("light")
  }

  function handleSwitchDark() {
    setTheme("dark")
  }

  // function handleSwitchSystem() {
  //   setTheme("system");
  // }

  // TODO: Uncomment the above function and the DropdownMenuItem below to enable system theme switching

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-4">
        <Sun className="rotate-0 transition-transform dark:absolute dark:h-0 dark:w-0 dark:-rotate-[25deg] dark:opacity-0" />
        <Moon className="dark:opacity-1 opacity-1 h-0 w-0 rotate-45 transition-all dark:static dark:h-[unset] dark:w-[unset] dark:rotate-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem
          className="cursor-pointer px-4 py-2"
          onClick={handleSwitchLight}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer px-4 py-2"
          onClick={handleSwitchDark}
        >
          Dark
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="px-4 py-2" onClick={handleSwitchSystem}>
          System
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ThemeDropdown }
