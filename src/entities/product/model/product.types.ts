import type { Image } from '@commercetools/platform-sdk'

export interface ICleanProduct {
  ABV: string
  IBU: string
  brewery: string
  country: string
  category: string | null
  title: string
  description: string
  slug: string
  id: string
  key?: string
  price: {
    amount: string
    discount: string | null
  }
  images?: Image[]
}
