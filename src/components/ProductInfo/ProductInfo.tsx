import type { IProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { ArrowLeftOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Carousel, Col, Divider, Flex, Image, Row, Space, Tooltip } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'
import './ProductInfo.scss'

interface Props extends BaseComponent {
  product: IProduct
}

export const ProductInfo: FC<Props> = ({ testId = 'product-info', product, ...rest }) => {
  const { title, category, country, brewery, ABV, IBU, price, discount, description, images } = product

  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

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
          <AppButton
            type="text"
            icon={<ArrowLeftOutlined />}
            iconPosition="start"
            onClick={() => navigate('/')}
            style={{ margin: '0 0 10px 40px' }}
          >
            Back To Catalog
          </AppButton>
          <Image.PreviewGroup items={images}>
            <Carousel
              arrows
              infinite={true}
              autoplay
              autoplaySpeed={8000}
              fade
              style={{ width: '80%', margin: '0 auto' }}
            >
              {images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt={`${title} - ${index + 1}`}
                    style={{ borderRadius: 8, objectFit: 'contain', width: '100%' }}
                  />
                </div>
              ))}
            </Carousel>
          </Image.PreviewGroup>
        </Col>

        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <AppTitle level={2}>{title}</AppTitle>

            <Space size="middle" align="baseline">
              {discount !== undefined && discount !== ''
                ? (
                    <Flex gap="middle">
                      <AppText style={{ fontSize: '28px', textDecoration: 'line-through', opacity: '0.7' }}>{price}</AppText>
                      {' '}
                      <AppText style={{ fontSize: '28px', color: '#E84B1A' }}>{discount}</AppText>
                    </Flex>
                  )
                : (
                    <AppText style={{ fontSize: '28px', fontWeight: '600' }}>{price}</AppText>
                  )}
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

            <div style={{ textAlign: 'justify' }}>{description}</div>

            <Divider />

            <Space>
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
    </Flex>
  )
}
