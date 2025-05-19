import type { FC } from 'react'
import { Flex } from 'antd'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { MainPageCarousel } from '@/components/MainPageCarousel/MainPageCarousel'
import { MainPageGrid } from '@/components/MainPageGrid/MainPageGrid'
import { NewProducts } from '@/components/NewProducts/NewProducts'
import { mockProducts } from '@/components/NewProducts/test-mock'
import { PromocodeSection } from '@/components/PromocodeSection/PromocodeSection'
import { appName } from '@/shared/constants'

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
