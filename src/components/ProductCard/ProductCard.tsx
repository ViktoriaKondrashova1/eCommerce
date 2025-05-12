import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Card, Flex, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'
import { AppButton } from '../AppButton'
import { AppTitle } from '../AppTitle/AppTitle'
import './ProductCard.scss'

interface Props extends BaseComponent {
  title: string
  imageUrl: string
  price: string
  category: string
  brewery: string
  discount?: string
}

export const ProductCard: FC<Props> = ({ testId = 'product-card', title, imageUrl, price, category, brewery, discount, ...rest }) => {
  return (
    <Card
      data-testid={testId}
      hoverable
      className="product-card"
      cover={(
        <img alt={title} src={imageUrl} />
      )}
      {...rest}
    >
      <Meta
        title={<AppTitle level={4}>{title}</AppTitle>}
        description={(
          <>
            <div style={{ fontSize: 16 }}>{brewery}</div>
            <div style={{ fontSize: 16 }}>{category}</div>
            <Flex justify="space-between" align="center">
              <div style={{ fontWeight: 'bold', marginTop: 8, fontSize: 20 }}>
                {discount !== undefined && discount !== ''
                  ? (
                      <Flex gap="small">
                        <div style={{ textDecoration: 'line-through' }}>{price}</div>
                        {' '}
                        <div style={{ color: '#E84B1A' }}>{discount}</div>
                      </Flex>
                    )
                  : price}
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
