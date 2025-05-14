import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { fetchProducts } from './fetch-products'

export async function getAbvRange(): Promise<{ min: number, max: number }> {
  try {
    const allProductsResponse = await fetchProducts()
    const products = importProductAdapter(allProductsResponse.body.results)

    const abv = products.map((product) => {
      const abvStr = product.ABV
      return Number.parseFloat(abvStr.replace('%', ''))
    })

    const minAbv = Math.min(...abv)
    const maxAbv = Math.max(...abv)

    return {
      min: minAbv,
      max: maxAbv,
    }
  }
  catch {
    throw new Error('Failed to get abv range')
  }
}
