import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { fetchProducts } from './fetch-products'

export async function getPriceRange(): Promise<{ min: number, max: number }> {
  try {
    const allProductsResponse = await fetchProducts()
    const products = importProductAdapter(allProductsResponse.body.results)

    const prices = products.map((product) => {
      const priceStr = product.price.discount ?? product.price.amount
      return Number.parseFloat(priceStr.replace('$', ''))
    })

    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    return {
      min: minPrice,
      max: maxPrice,
    }
  }
  catch {
    throw new Error('Failed to get price range')
  }
}
