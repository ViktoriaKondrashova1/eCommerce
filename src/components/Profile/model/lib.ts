import { countries } from '@/shared/validators/countries.ts'

export function getCountry(countryAbbr: string) {
  const foundedCountry = countries.find(country => country.value === countryAbbr)

  return foundedCountry ? foundedCountry.label : countryAbbr
}

export function getCountryAbbr(country: string) {
  const foundedCountry = countries.find(c => c.label === country)

  return foundedCountry ? foundedCountry.value : country
}
