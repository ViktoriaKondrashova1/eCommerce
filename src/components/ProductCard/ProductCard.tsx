import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import { PlusOutlined } from '@ant-design/icons'
import { Card, Flex, Grid, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '../AppButton'
import { AppTitle } from '../AppTitle/AppTitle'
import './ProductCard.scss'

interface Props extends BaseComponent {
  product: ICleanProduct
}

export const ProductCard: FC<Props> = ({ testId = 'product-card', product }) => {
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/catalog/product/${product.slug}`)}
      data-testid={testId}
      hoverable
      className="product-card"
      cover={(
        product.images
        && <img alt={product.title} src={product.images[0].url} />
      )}
    >
      <Meta
        title={<AppTitle level={4} className="product-title">{product.title}</AppTitle>}
        description={(
          <div className="product-description">
            <div className="brewery">{product.brewery}</div>
            <div className="category">{product.category}</div>
            <Flex justify="space-between" align="center" className="price-section">
              <div className="price">
                {product.price.discount !== null && product.price.discount !== ''
                  ? (
                      <Flex gap="small">
                        <span className="original-price">{product.price.amount}</span>
                        <span className="discount-price">{product.price.discount}</span>
                      </Flex>
                    )
                  : product.price.amount}
              </div>
              <Tooltip title="Add to Cart">
                <AppButton
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  style={{
                    width: screens.lg ? 32 : 24,
                    height: screens.lg ? 32 : 24,
                    minWidth: 'unset !important',
                    fontSize: screens.lg ? 16 : 14,
                  }}
                />
              </Tooltip>
            </Flex>
          </div>
        )}
      />
    </Card>
  )
}
