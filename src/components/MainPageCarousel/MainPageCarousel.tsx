import type { FC } from 'react'
import { carouselData } from '@/shared/constants'
import { Carousel, Flex, Grid } from 'antd'
import { AppTitle } from '../AppTitle/AppTitle'
import { CarouselCard } from '../CarouselCard/CarouselCard'
import './MainPageCarousel.scss'

interface IDataProps {
  id: number
  title: string
  image: string
}

const { useBreakpoint } = Grid

export const MainPageCarousel: FC = () => {
  const screens = useBreakpoint()

  const getCardsPerSlide = (): number => {
    if (!screens.sm)
      return 1
    if (!screens.md)
      return 2
    return 4
  }

  const chunkArray = (array: IDataProps[], size: number): IDataProps[][] => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size))
  }

  const slides = chunkArray(carouselData, getCardsPerSlide())

  return (
    <Flex vertical gap="large">
      <AppTitle level={3}>CHOOSE YOUR STYLE</AppTitle>
      <Carousel autoplay draggable>
        {slides.map(slide => (
          <div key={slide[0].id}>
            <Flex gap="large" justify={screens.xs ? 'center' : 'space-between'}>
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
