export function getQuizTime(timeStarted: Date, timeEnded: Date) {
  let message: string = ""
  const time = new Date(timeEnded)?.getTime() - new Date(timeStarted).getTime()

  const hours = Math.floor(time / 1000 / 60 / 60)
  const minutes = Math.floor(time / 1000 / 60) - hours * 60
  const seconds = Math.floor(time / 1000) - hours * 60 * 60 - minutes * 60

  if (hours) {
    message += `${hours}h, `
  }

  if (minutes) {
    message += `${minutes}m, and`
  }

  if (seconds) {
    message += ` ${seconds}s`
  }

  return message
}
