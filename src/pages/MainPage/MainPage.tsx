import type { FC } from 'react'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { NewProducts } from '@/components/NewProducts/NewProducts'
import { Flex } from 'antd'

export const MainPage: FC = () => {
  return (
    <Flex vertical gap="large">
      <HeroSection />
      <NewProducts />
    </Flex>
  )
}
