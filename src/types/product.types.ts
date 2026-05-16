export type Product = {
  nome: string

  modelo?: string
  fornecedor?: string

  largura?: number
  altura?: number
  profundidade?: number

  cores?: string[]

  caracteristicas?: string[]

  acabamento?: string
  revestimento?: string
  tecido?: string

  ncm?: string

  rawText: string
}