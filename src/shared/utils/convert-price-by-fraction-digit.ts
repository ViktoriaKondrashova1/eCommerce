export function convertPriceByFractionDigit(price: number, fractionDigits?: number | undefined): string {
  if (typeof price !== 'number' || Number.isNaN(price)) {
    throw new TypeError('Price is required for convertPriceByFractionDigit function')
  }

  const strRepresent = String(price)

  const shouldSkipConversion = (
    typeof fractionDigits !== 'number'
    || Number.isNaN(fractionDigits)
    || fractionDigits <= 0
  )

  if (shouldSkipConversion) {
    return strRepresent
  }

  const startPart = strRepresent.slice(0, strRepresent.length - fractionDigits)
  const restPart = strRepresent.slice(strRepresent.length - fractionDigits, strRepresent.length)

  return startPart
    ? `${startPart}.${restPart}`
    : `0.${restPart.padStart(fractionDigits, '0')}`
}
