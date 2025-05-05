import type { FC } from 'react'
import { carouselData } from '@/shared/constants'
import { Carousel, Flex } from 'antd'
import { AppTitle } from '../AppTitle/AppTitle'
import { CarouselCard } from '../CarouselCard/CarouselCard'
import './MainPageCarousel.scss'

interface IDataProps {
  id: number
  title: string
  image: string
}

export const MainPageCarousel: FC = () => {
  const chunkArray = (array: IDataProps[], size: number): IDataProps[][] => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size))
  }

  const slides = chunkArray(carouselData, 4)

  return (
    <Flex vertical gap="large">
      <AppTitle level={3}>CHOOSE YOUR STYLE</AppTitle>
      <Carousel autoplay>
        {slides.map(slide => (
          <div key={slide[0].id}>
            <Flex gap="large">
              {slide.map(card => (
                <CarouselCard key={card.id} title={card.title} image={card.image} />
              ))}
            </Flex>
          </div>
        ))}
      </Carousel>
    </Flex>
  )
}
