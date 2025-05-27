import type { ICleanProduct } from '../model/product.types'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { fetchProducts } from './fetch-products'

export async function getRandomRelatedProducts(title: string, category: string): Promise<ICleanProduct[]> {
  try {
    const allProductsResponse = await fetchProducts({})
    const products = importProductAdapter(allProductsResponse.body.results)

    if (!products.length) {
      return []
    }

    const shuffledProducts = [...products]
    const categoryProducts = shuffledProducts.filter(product => product.category === category)
    const uniqueProducts = categoryProducts.filter(product => product.title !== title)

    for (let i = uniqueProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueProducts[i], uniqueProducts[j]] = [uniqueProducts[j], uniqueProducts[i]]
    }

    const randomProducts = uniqueProducts.slice(0, 4)

    return randomProducts
  }
  catch {
    throw new Error('Failed to get random products')
  }
}
