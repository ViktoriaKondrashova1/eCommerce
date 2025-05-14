import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { Col, Row } from 'antd'
import { ProductCard } from '../ProductCard/ProductCard'

interface props extends BaseComponent {
  products: ICleanProduct[]
}

export const ProductList: FC<props> = ({ testId = 'product-list', products }) => {
  return (
    <Row
      data-testid={testId}
      gutter={[16, 16]}
      style={{ width: '100%' }}
    >
      {products.map(product => (
        <Col
          key={product.id}
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={6}
        >
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  )
}
