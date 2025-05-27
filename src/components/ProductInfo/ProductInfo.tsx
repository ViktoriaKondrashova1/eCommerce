import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Col, Divider, Flex, Row, Space, Tooltip } from 'antd'
import { useState } from 'react'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'
import { ProductImageGallery } from './ProductImageGallery'
import { RelatedProducts } from './RelatedProduct'
import './ProductInfo.scss'

interface Props extends BaseComponent {
  product: ICleanProduct
}

export const ProductInfo: FC<Props> = ({ testId = 'product-info', product, ...rest }) => {
  const { title, category, country, brewery, ABV, IBU, price: { amount, discount }, description, images } = product

  const [quantity, setQuantity] = useState(1)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

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

        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <AppTitle level={2} style={{ margin: '0' }}>{title}</AppTitle>

            <Space size="middle" align="baseline">
              {discount !== null
                ? (
                    <Flex gap="middle">
                      <AppText style={{ fontSize: '28px', textDecoration: 'line-through', opacity: '0.5' }}>{amount}</AppText>
                      {' '}
                      <AppText style={{ fontSize: '28px', color: '#ff4d4f' }}>{discount}</AppText>
                    </Flex>
                  )
                : (
                    <AppText style={{ fontSize: '28px', fontWeight: '600' }}>{amount}</AppText>
                  )}
            </Space>

            <Space>
              <AppTitle level={3} style={{ color: '#f56b21', margin: '0' }}>Characteristics</AppTitle>
            </Space>

            <Space size="small">
              <AppText style={{ fontWeight: '700' }}>Category: </AppText>
              <AppText>{category}</AppText>
            </Space>

            <Space size="small">
              <AppText style={{ fontWeight: '700' }}>Country: </AppText>
              <AppText>{country}</AppText>
            </Space>

            <Space size="small">
              <AppText style={{ fontWeight: '700' }}>Brewery: </AppText>
              <AppText>{brewery}</AppText>
            </Space>

            <Tooltip title="Beer strength as a percentage of total volume">
              <AppText style={{ fontWeight: '700' }}>ABV: </AppText>
              <AppText>{ABV}</AppText>
            </Tooltip>
            <Tooltip
              title="International beer bitterness scale from 0 to 100"
            >
              <AppText style={{ fontWeight: '700' }}>IBU: </AppText>
              <AppText>{IBU}</AppText>
            </Tooltip>

            <AppTitle level={3} style={{ color: '#f56b21', margin: '0' }}>Description</AppTitle>

            <div style={{ textAlign: 'justify' }}>{description}</div>
            <Divider />

            <Space style={{ marginBottom: '20px' }}>
              <AppButton
                type="primary"
                shape="round"
                icon={<ShoppingCartOutlined />}
                style={{ marginRight: '20px' }}
              >
                Add to Cart
              </AppButton>
              <AppButton
                shape="circle"
                icon={<MinusOutlined />}
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                style={{ minWidth: '0', width: '24px', height: '24px' }}
              />
              <AppText>{quantity}</AppText>
              <AppButton
                shape="circle"
                icon={<PlusOutlined />}
                onClick={increaseQuantity}
                style={{ minWidth: '0', width: '24px', height: '24px' }}
              />
            </Space>
          </Space>
        </Col>
      </Row>
      <RelatedProducts
        currentProduct={{
          title,
          category,
        }}
      />
    </Flex>
  )
}
