import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useNavigate } from 'react-router-dom'
import { categoryStore } from '@/entities/category/model/category.store'
import { AppTitle } from '../AppTitle/AppTitle'
import './CarouselCard.scss'

interface props extends BaseComponent {
  title: string
  image: string
}

export const CarouselCard: FC<props> = ({ testId = 'carousel-card', title, image, ...rest }) => {
  const navigate = useNavigate()
  const category = categoryStore.getCategoryByName(title)

  return (
    <Card
      className="main-carousel-card"
      hoverable
      cover={(
        <img alt={title} src={image} />
      )}
      onClick={() => navigate(`/catalog/category/${category?.slug['en-US']}`)}
      data-testid={testId}
      {...rest}
    >
      <Meta title={<AppTitle level={4}>{title.toUpperCase()}</AppTitle>} />
    </Card>
  )
}
