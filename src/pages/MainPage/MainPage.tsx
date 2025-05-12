import type { FC } from 'react'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { MainPageCarousel } from '@/components/MainPageCarousel/MainPageCarousel'
import { MainPageGrid } from '@/components/MainPageGrid/MainPageGrid'
import { NewProducts } from '@/components/NewProducts/NewProducts'
import { PromocodeSection } from '@/components/PromocodeSection/PromocodeSection'
import { appName, mockProducts } from '@/shared/constants'
import { Flex } from 'antd'

export const MainPage: FC = () => {
  return (
    <Flex vertical gap={48}>
      <HeroSection appName={appName} />
      <NewProducts products={mockProducts} />
      <PromocodeSection />
      <MainPageGrid />
      <MainPageCarousel />
    </Flex>
  )
}
