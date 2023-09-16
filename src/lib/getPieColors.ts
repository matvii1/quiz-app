const COLORS = {
  25: "#F62701",
  50: "#FFBB28",
  75: "#00C49F",
  100: "#00F09F",
}

const DARK_COLORS = {
  25: "#9E2300",
  50: "#FFEF67",
  75: "#00C49F",
  100: "#08D39A",
}

export function getPieColor(value: number, isDark: boolean) {
  if (value <= 25) {
    return isDark ? DARK_COLORS[25] : COLORS[25]
  }

  if (value <= 50) {
    return isDark ? DARK_COLORS[50] : COLORS[50]
  }

  if (value <= 75) {
    return isDark ? DARK_COLORS[75] : COLORS[75]
  }

  return isDark ? DARK_COLORS[100] : COLORS[100]
}
