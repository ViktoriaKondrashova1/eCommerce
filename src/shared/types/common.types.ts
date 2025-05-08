export interface BaseComponent {
  testId?: string
}

export interface IProduct {
  id: number
  title: string
  category: string
  country: string
  brewery: string
  ABV: string
  IBU: string
  price: string
  discount?: string
  description: string
  images: string[]
}
