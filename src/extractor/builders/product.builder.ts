import { Product } from "../../models/product.model"

import { detectName } from "../detectors/name.detector"

import { detectMeasures } from "../normalizers/measures.normalizer"

import { detectColors } from "../normalizers/colors.normalizer"

import { detectCharacteristics } from "../normalizers/characteristics.normalizer"

export function buildProduct(rawText: string): Product {

  const measures = detectMeasures(rawText)

  return {

    nome: detectName(rawText),

    medidas: {
      largura: Number(measures?.largura || 0),
      altura: Number(measures?.altura || 0),
      profundidade: Number(measures?.profundidade || 0),
    },

    cores: detectColors(rawText),

    caracteristicas: detectCharacteristics(rawText),

    rawText,

    categoria: "",

    peso: 0,

    variacoes: [],

    sku: "",

    ncm: "",

    preco: 0,

    confidence: {}
  }
}