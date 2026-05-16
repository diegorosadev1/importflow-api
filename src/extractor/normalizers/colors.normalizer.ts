import { COLORS } from "../rules/colors.rules"

export function detectColors(text: string) {

  const found: string[] = []

  COLORS.forEach(color => {

    if (text.toUpperCase().includes(color)) {
      found.push(color)
    }

  })

  return found
}