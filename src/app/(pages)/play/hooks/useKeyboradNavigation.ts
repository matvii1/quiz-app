import { useEffect } from "react"

type Action = {
  next: () => void
  prev: () => void
}

export function useKeyboradNavigation({ next, prev }: Action) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowDown":
          next()

          break

        case "ArrowUp":
          prev()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.addEventListener("keydown", handleKeyDown)
    }
  }, [])
}
