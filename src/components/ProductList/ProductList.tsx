import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import { Col, Row } from 'antd'
import { ProductCard } from '../ProductCard/ProductCard'
import './ProductList.scss'

interface Props extends BaseComponent {
  products: ICleanProduct[]
}

export const ProductList: FC<Props> = ({ testId = 'product-list', products }) => {
  return (
    <div className="product-list" data-testid={testId}>
      <Row
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
            xxl={0}
            className="col five-cols"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
