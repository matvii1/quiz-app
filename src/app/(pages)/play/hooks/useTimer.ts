import { useCallback, useEffect, useRef, useState } from "react"

const TIME_FOR_QUIZ = 45

export function useTimer() {
  const [timer, setTimer] = useState(TIME_FOR_QUIZ)

  const timerId = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1
        }

        return prev
      })
    }, 1000)

    return () => clearInterval(timerId.current)
  }, [])

  function stopTimer() {
    clearInterval(timerId.current)
  }

  const resetTimer = useCallback(() => {
    setTimer(TIME_FOR_QUIZ)
  }, [])

  return { timer, resetTimer, stopTimer }
}
