import { CHARACTERISTICS } from "../rules/characteristics.rules"

export function detectCharacteristics(text: string) {

  const found: string[] = []

  Object.values(CHARACTERISTICS)
    .flat()
    .forEach(characteristic => {

      if (
        text
          .toUpperCase()
          .includes(characteristic.toUpperCase())
      ) {
        found.push(characteristic)
      }
    })

  return found
}