import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Card, Flex, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'
import { AppButton } from '../AppButton'
import { AppTitle } from '../AppTitle/AppTitle'
import './ProductCard.scss'

interface Props extends BaseComponent {
  product: ICleanProduct
}

export const ProductCard: FC<Props> = ({ testId = 'product-card', product }) => {
  return (
    <Card
      data-testid={testId}
      hoverable
      className="product-card"
      cover={(
        product.images
        && <img alt={product.title} src={product.images[0].url} />
      )}
    >
      <Meta
        title={<AppTitle level={4}>{product.title}</AppTitle>}
        description={(
          <>
            <div style={{ fontSize: 16 }}>{product.brewery}</div>
            <div style={{ fontSize: 16 }}>{product.category}</div>
            <Flex justify="space-between" align="center">
              <div style={{ fontWeight: 'bold', marginTop: 8, fontSize: 20 }}>
                {product.price.discount !== null && product.price.discount !== ''
                  ? (
                      <Flex gap="small">
                        <div style={{ textDecoration: 'line-through' }}>{product.price.amount}</div>
                        {' '}
                        <div style={{ color: '#E84B1A' }}>{product.price.discount}</div>
                      </Flex>
                    )
                  : product.price.amount}
              </div>
              <Tooltip title="Add to Cart">
                <AppButton type="primary" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </Flex>
          </>
        )}
      />
    </Card>
  )
}
