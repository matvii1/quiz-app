export function fontSizeMapper(word: { value: number }): number {
  return Math.log2(word.value) * 15
}
