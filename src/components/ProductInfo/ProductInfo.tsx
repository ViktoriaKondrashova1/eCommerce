import type { IProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Carousel, Flex, Image, Tooltip } from 'antd'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'
import './ProductInfo.scss'

interface Props extends BaseComponent {
  product: IProduct
}

export const ProductInfo: FC<Props> = ({ testId = 'product-info', product, ...rest }) => {
  const { title, category, country, brewery, ABV, IBU, price, discount, description, images } = product

  return (
    <Flex
      data-testid={testId}
      className="product-info"
      {...rest}
    >
      <AppTitle level={4}>{title}</AppTitle>
      <AppText>
        {discount !== undefined && discount !== ''
          ? (
              <Flex gap="small">
                <div style={{ textDecoration: 'line-through' }}>{price}</div>
                {' '}
                <div style={{ color: '#E84B1A' }}>{discount}</div>
              </Flex>
            )
          : price}
      </AppText>
      <Carousel arrows infinite={true}>
        <Image.PreviewGroup
          items={images}
        >
          <Image
            width={200}
            src={images[0]}
          />
        </Image.PreviewGroup>
      </Carousel>
      <AppText>{`Category ${category}`}</AppText>
      <AppText>{`Country ${country}`}</AppText>
      <AppText>{`Brewery ${brewery}`}</AppText>
      <AppText>{`ABV ${ABV}`}</AppText>
      <AppText>{`IBU ${IBU}`}</AppText>
      <AppText>{description}</AppText>

      <Tooltip title="Add to Cart">
        <AppButton type="primary" shape="default" icon={<PlusOutlined />} />
      </Tooltip>
    </Flex>
  )
}
