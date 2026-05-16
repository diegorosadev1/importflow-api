export function normalizeText(text: string) {
  return text
    .toUpperCase()

    .replace(/ENC\b/g, "ENCOSTO")
    .replace(/C\/VD/g, "COM VIDRO")
    .replace(/\bVD\b/g, "VIDRO")
    .replace(/\bASS\b/g, "ASSENTO")
    .replace(/\bESTOF\b/g, "ESTOFADO")
    .replace(/\bCTOS\b/g, "CANTOS")

    .replace(/\s+/g, " ")
    .trim()
}