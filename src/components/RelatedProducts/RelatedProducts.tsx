import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Flex, Grid } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '../AppButton/AppButton'
import { AppTitle } from '../AppTitle/AppTitle'
import { ProductCard } from '../ProductCard/ProductCard'

interface Props extends BaseComponent {
  title: string
  products: ICleanProduct[]
  showButton?: boolean
}

const { useBreakpoint } = Grid

export const RelatedProducts: FC<Props> = ({ testId = 'related-products', title, products, showButton = true }) => {
  const navigate = useNavigate()
  const screens = useBreakpoint()

  return (
    <Flex vertical gap="large" data-testid={testId}>
      <Flex vertical={screens.xs} justify={screens.xs ? 'flex-start' : 'space-between'}>
        <AppTitle level={3}>{title}</AppTitle>
        { showButton && (
          <AppButton type="text" icon={<ArrowRightOutlined />} iconPosition="end" onClick={() => navigate('/catalog/1')}>Go To Catalog</AppButton>
        )}
      </Flex>
      <Flex wrap="wrap" justify="space-around" gap="small">
        {products.map(card =>
          <ProductCard key={card.id} product={card} />,
        )}
      </Flex>
    </Flex>
  )
}
