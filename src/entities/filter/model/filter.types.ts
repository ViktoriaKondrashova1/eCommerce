import type { Category } from '@commercetools/platform-sdk'

export interface FilterData {
  categories: Category[] | undefined
  breweries: string[] | undefined
  countries: string[] | undefined
  priceRange: { min: number, max: number }
  // abvRange: { min: number, max: number }
}
