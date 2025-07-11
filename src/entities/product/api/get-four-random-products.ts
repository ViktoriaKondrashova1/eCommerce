import type { ICleanProduct } from '../model/product.types'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { fetchProducts } from './fetch-products'

export async function getFourRandomProducts(title?: string, category?: string): Promise<ICleanProduct[]> {
  try {
    const allProductsResponse = await fetchProducts({})
    const products = importProductAdapter(allProductsResponse.body.results)

    if (!products.length) {
      return []
    }

    let shuffledProducts = null

    if (title !== undefined && category !== undefined) {
      shuffledProducts = products.filter(product =>
        product.category === category && product.title !== title)
    }
    else {
      shuffledProducts = [...products]
    }

    for (let i = shuffledProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]]
    }

    const randomProducts = shuffledProducts.slice(0, 4)

    return randomProducts
  }
  catch {
    throw new Error('Failed to get random products')
  }
}
