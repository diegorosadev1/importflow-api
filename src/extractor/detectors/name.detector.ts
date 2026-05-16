const PRODUCT_TYPES = [
  "BUFFET",
  "MESA",
  "CADEIRA",
  "BANQUETA",
  "POLTRONA",
  "APARADOR",
  "PUFF"
]

export function detectName(text: string) {

  const lines = text.split("\n")

  for (const line of lines) {

    const upper = line.toUpperCase()

    const hasProductType = PRODUCT_TYPES.some(type =>
      upper.includes(type)
    )

    if (hasProductType) {
      return line.trim()
    }
  }

  return "PRODUTO SEM NOME"
}