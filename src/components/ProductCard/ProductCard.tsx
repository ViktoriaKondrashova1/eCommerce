import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import { Card, Flex } from 'antd'
import Meta from 'antd/es/card/Meta'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { cartStore } from '@/entities/cart/model/cart.store'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import { AppTitle } from '../AppTitle/AppTitle'
import './ProductCard.scss'

interface Props extends BaseComponent {
  product: ICleanProduct
}

export const ProductCard: FC<Props> = observer(({ testId = 'product-card', product }) => {
  const navigate = useNavigate()

  const lineItemId = cartStore.getProductLineItemId(product.id)

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
                      <Flex gap="6px">
                        <span className="original-price">{product.price.amount}</span>
                        <span className="discount-price">{product.price.discount}</span>
                      </Flex>
                    )
                  : product.price.amount}
              </div>
              <AddToCartButton
                productId={product.id}
                lineItemId={lineItemId}
              />
            </Flex>
          </div>
        )}
      />
    </Card>
  )
})
