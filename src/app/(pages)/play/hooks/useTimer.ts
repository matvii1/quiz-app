import { useCallback, useEffect, useState } from "react"

const TIME_FOR_QUIZ = 45

export function useTimer() {
  const [timer, setTimer] = useState(TIME_FOR_QUIZ)

  useEffect(() => {
    setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1
        }

        return prev
      })
    }, 1000)
  }, [])

  const resetTimer = useCallback(() => {
    setTimer(TIME_FOR_QUIZ)
  }, [])

  return { timer, resetTimer }
}
