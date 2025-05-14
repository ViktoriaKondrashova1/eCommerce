import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { fetchProducts } from './fetch-products'

export async function getCountriesList(): Promise<string[]> {
  try {
    const allProductsResponse = await fetchProducts()
    const products = importProductAdapter(allProductsResponse.body.results)

    const countriesSet = new Set<string>()

    products.forEach((product) => {
      if (product.country) {
        countriesSet.add(product.country)
      }
    })

    return Array.from(countriesSet)
  }
  catch {
    throw new Error('Failed to fetch breweries')
  }
}
