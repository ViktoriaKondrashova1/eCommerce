import { fetchProducts } from '@/entities/product/api/fetch-products'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'

export async function getPriceRange(): Promise<{ min: number, max: number }> {
  try {
    const allProductsResponse = await fetchProducts()
    const products = importProductAdapter(allProductsResponse.body.results)

    const prices = products.map((product) => {
      return Number.parseFloat(product.price.amount.replace('$', ''))
    })

    const discounts = products
      .filter(product => product.price.discount != null)
      .map((product) => {
        return Number.parseFloat(product.price.discount!.replace('$', ''))
      })

    const allPrices = [...prices, ...discounts]

    if (allPrices.length === 0) {
      return { min: 0, max: 0 }
    }

    return {
      min: Math.min(...allPrices),
      max: Math.max(...allPrices),
    }
  }
  catch {
    throw new Error('Failed to get price range')
  }
}
