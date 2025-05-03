import type { FC } from 'react'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { NewProducts } from '@/components/NewProducts/NewProducts'
import { PromocodeSection } from '@/components/PromocodeSection/PromocodeSection'
import { Flex } from 'antd'

export const MainPage: FC = () => {
  return (
    <Flex vertical gap={32}>
      <HeroSection />
      <NewProducts />
      <PromocodeSection />
    </Flex>
  )
}
