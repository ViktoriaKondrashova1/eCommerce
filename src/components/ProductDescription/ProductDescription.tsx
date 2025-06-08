import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Col, Divider, Flex, Row, Space, Tooltip } from 'antd'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'
import { Incrementer } from '../Incrementer/Incrementer'
import { ProductImageGallery } from '../ProductImageGallery/ProductImageGallery'
import './ProductDescription.scss'

interface Props extends BaseComponent {
  product: ICleanProduct
}

export const ProductDescription: FC<Props> = ({ testId = 'product-info', product, ...rest }) => {
  const { title, category, country, brewery, ABV, IBU, price: { amount, discount }, description, images } = product

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
              <AppButton
                type="primary"
                shape="round"
                icon={<ShoppingCartOutlined />}
              >
                Add to Cart
              </AppButton>
              <Incrementer productId={product.id} />
            </Flex>
          </Space>
        </Col>
      </Row>
    </Flex>
  )
}
