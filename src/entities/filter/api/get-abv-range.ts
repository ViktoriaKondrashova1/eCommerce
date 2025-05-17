import { fetchProducts } from '@/entities/product/api/fetch-products'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'

export async function getAbvRange(): Promise<{ min: number, max: number }> {
  try {
    const allProductsResponse = await fetchProducts()
    const products = importProductAdapter(allProductsResponse.body.results)

    const abv = products.map((product) => {
      return Number.parseFloat(product.ABV.replace('%', ''))
    })

    if (abv.length === 0) {
      return { min: 0, max: 0 }
    }

    return {
      min: Math.min(...abv),
      max: Math.max(...abv),
    }
  }
  catch {
    throw new Error('Failed to get abv range')
  }
}
