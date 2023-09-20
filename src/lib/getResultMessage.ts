export function getResultMessage(percentageCorrect: number) {
  if (percentageCorrect <= 25) {
    return "You can do better than that!"
  }

  if (percentageCorrect <= 50) {
    return "Not bad!"
  }

  if (percentageCorrect <= 75) {
    return "Great job!"
  }

  return "Amazing!"
}
