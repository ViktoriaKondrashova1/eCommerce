import type { ICleanProduct } from '@/entities/product/model/product.types'
import { getRandomRelatedProducts } from '@/entities/product/api/get-random-related-products'
import { Alert, Col, Row, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { ProductCard } from '../ProductCard/ProductCard'

interface RelatedProductsProps {
  currentProduct: {
    title: string
    category: string | null
  }
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<ICleanProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        setLoading(true)

        if (currentProduct.category == null) {
          setRelatedProducts([])
          return
        }

        const products = await getRandomRelatedProducts(
          currentProduct.title,
          currentProduct.category,
        )

        setRelatedProducts(products)
      }
      finally {
        setLoading(false)
      }
    }

    void loadRelatedProducts()
  }, [currentProduct.title, currentProduct.category])

  if (currentProduct.category == null) {
    return null // Не показываем блок, если у продукта нет категории
  }

  if (loading) {
    return <Spin tip="Loading related products..." />
  }

  if (relatedProducts.length === 0) {
    return <Alert message="No related products found" type="info" showIcon />
  }

  return (
    <div className="related-products">
      <h2>Related products</h2>
      <Row gutter={[16, 16]}>
        {relatedProducts.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ),
        )}
      </Row>
    </div>
  )
}
