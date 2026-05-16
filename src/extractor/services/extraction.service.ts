import pdf from "pdf-parse";

import fs from "fs"

import { detectProducts } from "../detectors/product.detector"

import { buildProduct } from "../builders/product.builder"

export async function extractProductsFromPdf(
  filePath: string
) {

  const buffer = fs.readFileSync(filePath)

  const data = await pdf(buffer)

  const text = data.text

  const productBlocks = detectProducts(text)

  const products = productBlocks.map(block =>
    buildProduct(block)
  )

  return {
    total: products.length,
    products
  }
}