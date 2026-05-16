export function detectMeasures(text: string) {

  const regex = /(\d{2,3})\s?x\s?(\d{2,3})\s?x\s?(\d{2,3})/i

  const match = text.match(regex)

  if (!match) {
    return null
  }

  return {
    largura: match[1],
    profundidade: match[2],
    altura: match[3]
  }
}