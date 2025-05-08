import type { BaseComponent, IProduct } from '@/shared/types/common.types'
import type { FC } from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '../AppButton/AppButton'
import { AppProductCard } from '../AppProductCard/AppProductCard'
import { AppTitle } from '../AppTitle/AppTitle'

interface Props extends BaseComponent {
  products: IProduct[]
}

export const NewProducts: FC<Props> = ({ testId = 'new-products', products }) => {
  const navigate = useNavigate()

  return (
    <Flex vertical gap="large" data-testid={testId}>
      <Flex justify="space-between">
        <AppTitle level={3}>NEW</AppTitle>
        <AppButton type="text" icon={<ArrowRightOutlined />} iconPosition="end" onClick={() => navigate('/catalog')}>Go To Catalog</AppButton>
      </Flex>
      <Flex wrap="wrap" justify="space-around" gap="large">
        {products.map(card =>
          <AppProductCard key={card.id} title={card.title} imageUrl={card.images[0]} price={card.price} category={card.category} brewery={card.brewery} discount={card.discount} />,
        )}
      </Flex>
    </Flex>
  )
}
