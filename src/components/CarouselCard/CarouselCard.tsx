import type { FC } from 'react'
import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { AppTitle } from '../AppTitle/AppTitle'
import './CarouselCard.scss'

interface props {
  title: string
  image: string
}

export const CarouselCard: FC<props> = ({ title, image }) => {
  return (
    <Card
      className="main-carousel-card"
      hoverable
      cover={(
        <img alt={title} src={image} />
      )}
    >
      <Meta title={<AppTitle level={4}>{title}</AppTitle>} />
    </Card>
  )
}
