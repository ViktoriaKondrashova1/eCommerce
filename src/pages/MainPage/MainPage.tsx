import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { FC } from 'react'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts'
import { getFourRandomProducts } from '@/entities/product/api/get-four-random-products'
import { HeroSection, MainPageCarousel, MainPageGrid, PromocodeSection } from '@/modules/Home'
import { appName, promocode15, promocode20, promocodeText15, promocodeText20 } from '@/shared/constants'
import { useRequest } from '@/shared/hooks/use-request'
import { Flex } from 'antd'
import { useCategories } from './use-categories'

export const MainPage: FC = () => {
  const {
    data: newProducts,
    isLoading,
    isError,
  } = useRequest<ICleanProduct[]>(getFourRandomProducts)

  useCategories()

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
      <PromocodeSection promocode={promocode15} promocodeText={promocodeText15} />
      <MainPageGrid />
      <PromocodeSection promocode={promocode20} promocodeText={promocodeText20} />
      <MainPageCarousel />
    </Flex>
  )
}
