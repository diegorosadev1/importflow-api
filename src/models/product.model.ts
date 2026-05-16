export type ProductVariation = {
  nome?: string
  cor?: string
  preco?: number
}

export type ProductMeasures = {
  largura?: number
  altura?: number
  profundidade?: number
}

export type ProductConfidence = {
  [key: string]: number
}

export type Product = {
  nome: string

  categoria?: string

  medidas?: ProductMeasures

  peso?: number

  cores?: string[]

  caracteristicas?: string[]

  variacoes?: ProductVariation[]

  sku?: string

  ncm?: string

  preco?: number

  confidence?: ProductConfidence

  rawText: string
}