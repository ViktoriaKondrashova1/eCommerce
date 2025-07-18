import type { BaseComponent } from '@/shared/types/common.types.ts'
import type { FC } from 'react'
import { carouselData } from '@/modules/Home/MainPageCarousel/constructor.ts'
import { Carousel, Flex, Grid } from 'antd'
import { useMemo } from 'react'
import { AppTitle } from '../../../components/AppTitle/AppTitle.tsx'
import { CarouselCard } from '../../../components/CarouselCard/CarouselCard.tsx'
import './MainPageCarousel.scss'

interface IDataProps {
  id: number
  title: string
  image: string
}

interface Props extends BaseComponent {}

const { useBreakpoint } = Grid

export const MainPageCarousel: FC<Props> = ({ testId = 'main-page-carousel' }) => {
  const screens = useBreakpoint()

  const cardsPerSlide: number = useMemo(() => {
    if (!screens.sm)
      return 1
    if (!screens.md)
      return 2
    return 4
  }, [screens])

  const chunkArray = (array: IDataProps[], size: number): Array<{ id: number, chunk: IDataProps[] }> => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => ({
      id: i,
      chunk: array.slice(i * size, i * size + size),
    }))
  }

  const slides = chunkArray(carouselData, cardsPerSlide)

  return (
    <Flex vertical gap="large" data-testid={testId}>
      <AppTitle level={3}>CHOOSE YOUR STYLE</AppTitle>
      <Carousel autoplay draggable style={{ width: '100%' }}>
        {slides.map(slide => (
          <div key={slide.id}>
            <Flex gap="large" justify={screens.xs ? 'center' : 'space-between'}>
              {slide.chunk.map(card => (
                <CarouselCard key={card.id} title={card.title} image={card.image} />
              ))}
            </Flex>
          </div>
        ))}
      </Carousel>
    </Flex>
  )
}
