import type { ICleanProduct } from '@/entities/product/model/product.types.ts'
import type { BaseComponent } from '@/shared/types/common.types.ts'
import type { FC } from 'react'
import { AddOrRemoveFormCartButton } from '@/components/AddOrRemoveFormCartButton/AddOrRemoveFormCartButton.tsx'
import { AppText } from '@/components/AppText/AppText.tsx'
import { AppTitle } from '@/components/AppTitle/AppTitle.tsx'
import { cartStore } from '@/entities/cart/model/cart.store.ts'
import { Col, Divider, Flex, Row, Space, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import { ProductImageGallery } from './../ProductImageGallery/ProductImageGallery.tsx'
import './ProductDescription.scss'

interface Props extends BaseComponent {
  product: ICleanProduct
}

export const ProductDescription: FC<Props> = observer(({ testId = 'product-info', product, ...rest }) => {
  const { title, category, country, brewery, ABV, IBU, price: { amount, discount }, description, images } = product

  const lineItemId = cartStore.getProductLineItemId(product.id)
  const quantity = cartStore.getProductQuantityInCart(product.id)

  return (
    <Flex
      vertical
      data-testid={testId}
      className="product-info"
      {...rest}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <ProductImageGallery images={images} title={title} />
        </Col>

        <Col xs={24} md={12} className="descripion-container">
          <Space direction="vertical" size="middle">
            <AppTitle level={2} style={{ margin: '0' }}>{title}</AppTitle>

            <Space size="middle" align="baseline">
              {discount !== null
                ? (
                    <Flex gap="middle">
                      <AppText className="description__original-price ">{amount}</AppText>
                      <AppText className="description__discount-price ">{discount}</AppText>
                    </Flex>
                  )
                : (
                    <AppText className="description__price">{amount}</AppText>
                  )}
            </Space>

            <Flex vertical gap="small">
              <Flex align="center" gap="middle">
                <AppText className="category-name">Category:</AppText>
                <AppText className="description-text">{category}</AppText>
              </Flex>

              <Flex align="center" gap="middle">
                <AppText className="category-name">Country:</AppText>
                <AppText className="description-text">{country}</AppText>
              </Flex>

              <Flex align="center" gap="middle">
                <AppText className="category-name">Brewery:</AppText>
                <AppText className="description-text">{brewery}</AppText>
              </Flex>

              <Flex align="center" gap="middle">
                <Tooltip title="Beer strength as a percentage of total volume">
                  <AppText className="category-name">ABV:</AppText>
                </Tooltip>
                <AppText className="description-text">{ABV}</AppText>
              </Flex>

              <Flex align="center" gap="middle">
                <Tooltip title="International beer bitterness scale from 0 to 100">
                  <AppText className="category-name">IBU:</AppText>
                </Tooltip>
                <AppText className="description-text">{IBU}</AppText>
              </Flex>
            </Flex>
            <Divider />
            <div className="description-text">{description}</div>
            <Flex gap="middle" align="center" style={{ margin: '20px 0 60px' }}>
              <AddOrRemoveFormCartButton productId={product.id} lineItemId={lineItemId} quantity={quantity} />
            </Flex>
          </Space>
        </Col>
      </Row>
    </Flex>
  )
})
