import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { fetchProducts } from './fetch-products'

export async function getAllBreweries(): Promise<string[]> {
  try {
    const allProductsResponse = await fetchProducts()
    const products = importProductAdapter(allProductsResponse.body.results)

    const breweriesSet = new Set<string>()

    products.forEach((product) => {
      if (product.brewery) {
        breweriesSet.add(product.brewery)
      }
    })

    return Array.from(breweriesSet)
  }
  catch {
    throw new Error('Failed to fetch breweries')
  }
}
