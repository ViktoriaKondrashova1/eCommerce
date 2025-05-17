import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { Col, Row } from 'antd'
import { ProductCard } from '../ProductCard/ProductCard'
import './ProductList.scss'

interface Props extends BaseComponent {
  products: ICleanProduct[]
}

export const ProductList: FC<Props> = ({ testId = 'product-list', products }) => {
  return (
    <div className="product-list">
      <Row
        data-testid={testId}
        gutter={[24, 24]}
        className="row"
      >
        {products.map(product => (
          <Col
            key={product.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            className="col"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
