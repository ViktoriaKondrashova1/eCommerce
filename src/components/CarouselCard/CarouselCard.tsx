import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { AppTitle } from '../AppTitle/AppTitle'
import './CarouselCard.scss'

interface props extends BaseComponent {
  title: string
  image: string
}

export const CarouselCard: FC<props> = ({ testId = 'carousel-card', title, image, ...rest }) => {
  return (
    <Card
      className="main-carousel-card"
      hoverable
      cover={(
        <img alt={title} src={image} />
      )}
      data-testid={testId}
      {...rest}
    >
      <Meta title={<AppTitle level={4}>{title}</AppTitle>} />
    </Card>
  )
}
