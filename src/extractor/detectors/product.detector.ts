const PRODUCT_TYPES = [
  "BUFFET",
  "MESA",
  "CADEIRA",
  "BANQUETA",
  "POLTRONA",
  "APARADOR",
  "PUFF",
]

export function detectProducts(text: string) {

  const lines = text.split("\n")

  const products: string[] = []

  let currentBlock = ""

  lines.forEach(line => {

    const isNewProduct = PRODUCT_TYPES.some(type =>
      line.toUpperCase().includes(type)
    )

    if (isNewProduct) {

      if (currentBlock) {
        products.push(currentBlock)
      }

      currentBlock = line

    } else {

      currentBlock += "\n" + line
    }

  })

  if (currentBlock) {
    products.push(currentBlock)
  }

  return products
}