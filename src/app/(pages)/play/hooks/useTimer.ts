import { useCallback, useEffect, useState } from "react"

const TIME_FOR_QUIZ = 45

export function useTimer() {
  const [timer, setTimer] = useState(TIME_FOR_QUIZ)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1
        }

        return prev
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const resetTimer = useCallback(() => {
    setTimer(TIME_FOR_QUIZ)
  }, [])

  return { timer, resetTimer }
}
