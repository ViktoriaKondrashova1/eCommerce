import type { FC } from 'react'
import { ProductInfo } from '@/components/ProductInfo/ProductInfo'
import { mockProducts } from '@/shared/constants'

export const ProductPage: FC = () => {
  return (
    <>
      <ProductInfo product={mockProducts[1]} />
    </>
  )
}
