import { fetchProducts } from '@/entities/product/api/fetch-products'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'

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
