"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider
      {...props}
      defaultTheme="system"
      attribute="class"
      enableSystem
    >
      {children}
    </NextThemeProvider>
  )
}

export { ThemeProvider }
