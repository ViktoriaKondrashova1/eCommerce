import type { ICleanProduct } from '@/entities/product/model/product.types.ts'
import { useEffect, useState } from 'react'
import { getFourRandomProducts } from '@/entities/product/api/get-four-random-products.ts'

export function useRelatedProducts(title: string, category: string | null) {
  const [relatedProducts, setRelatedProducts] = useState<ICleanProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true)
        setIsError(false)
        setError(null)

        if (category == null) {
          setRelatedProducts([])
          return
        }

        const products = await getFourRandomProducts(title, category)
        setRelatedProducts(products)
      }
      catch (err) {
        setIsError(true)
        setError(err instanceof Error ? err.message : 'Failed to load related products')
        return null
      }
      finally {
        setIsLoading(false)
      }
    }

    void loadProducts()
  }, [title, category])

  return { relatedProducts, isLoading, isError, error }
}
