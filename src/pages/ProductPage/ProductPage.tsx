import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { FC } from 'react'
import { ProductInfo } from '@/components/ProductInfo/ProductInfo'
import { fetchProductBySlug } from '@/entities/product/api/fetch-products'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ProductPage: FC = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState<ICleanProduct>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug == null)
      return

    const loadProduct = async () => {
      try {
        setLoading(true)
        const durtyProduct = await fetchProductBySlug(slug)
        const product = importProductAdapter(durtyProduct.body.results)[0]
        setProduct(product)
      }
      finally {
        setLoading(false)
      }
    }

    void loadProduct()
  }, [slug])

  if (loading)
    return <div>Loading...</div>
  if (!product)
    return <div>Product not found</div>

  return (
    <>
      <ProductInfo product={product} />
    </>
  )
}
