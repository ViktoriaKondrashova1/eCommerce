import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '../AppButton/AppButton'
import { AppTitle } from '../AppTitle/AppTitle'
import { ProductCard } from '../ProductCard/ProductCard'

interface Props extends BaseComponent {
  title: string
  products: ICleanProduct[]
  showButton?: boolean
}

export const RelatedProducts: FC<Props> = ({ testId = 'related-products', title, products, showButton = true }) => {
  const navigate = useNavigate()

  return (
    <Flex vertical gap="large" data-testid={testId}>
      <Flex justify="space-between">
        <AppTitle level={3}>{title}</AppTitle>
        { showButton && (
          <AppButton type="text" icon={<ArrowRightOutlined />} iconPosition="end" onClick={() => navigate('/catalog/1')}>Go To Catalog</AppButton>
        )}
      </Flex>
      <Flex wrap="wrap" justify="space-around" gap="large">
        {products.map(card =>
          <ProductCard key={card.id} product={card} />,
        )}
      </Flex>
    </Flex>
  )
}
