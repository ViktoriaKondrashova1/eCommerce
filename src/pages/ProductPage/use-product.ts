import type { ICleanProduct } from '@/entities/product/model/product.types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductBySlug } from '@/entities/product/api/fetch-products'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'

export function useProductBySlug() {
  const { slug } = useParams()
  const [product, setProduct] = useState<ICleanProduct>()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug !== undefined) {
      const loadProduct = async () => {
        try {
          setIsLoading(true)
          setIsError(false)
          setError(null)

          const response = await fetchProductBySlug(slug)
          const [adaptedProduct] = importProductAdapter(response.body.results)

          setProduct(adaptedProduct)
        }
        catch (err) {
          setIsError(true)
          setError(err instanceof Error ? err.message : 'Failed to load product')
          return null
        }
        finally {
          setIsLoading(false)
        }
      }

      void loadProduct()
    }
  }, [slug])

  return { product, isLoading, isError, error }
}
