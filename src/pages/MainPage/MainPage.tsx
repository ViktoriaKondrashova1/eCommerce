import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import { Flex } from 'antd'
import { useEffect } from 'react'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { MainPageCarousel } from '@/components/MainPageCarousel/MainPageCarousel'
import { MainPageGrid } from '@/components/MainPageGrid/MainPageGrid'
import { PromocodeSection } from '@/components/PromocodeSection/PromocodeSection'
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts'
import { createCart } from '@/entities/cart/api/create-cart'
import { getFourRandomProducts } from '@/entities/product/api/get-four-random-products'
import { appName } from '@/shared/constants'
import { useRequest } from '@/shared/hooks/use-request'
import { useCategories } from './use-categories'

export const MainPage: FC = () => {
  const {
    data: newProducts,
    isLoading,
    isError,
  } = useRequest<ICleanProduct[]>(getFourRandomProducts)

  useCategories()

  useEffect(() => {
    const fn = async () => {
      await createCart()
    }

    void fn()
  })

  return (
    <Flex vertical gap={48}>
      <HeroSection appName={appName} />
      {isLoading
        ? (
            <AppSkeleton />
          )
        : isError
          ? (
              <AppEmpty />
            )
          : (
              <RelatedProducts title="NEW" products={newProducts || []} />
            )}
      <PromocodeSection />
      <MainPageGrid />
      <MainPageCarousel />
    </Flex>
  )
}
