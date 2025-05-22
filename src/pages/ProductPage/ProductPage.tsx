import type { FC } from 'react'
import { Backdrop } from '@/components/Backdrop/Backdrop'
import { ProductInfo } from '@/components/ProductInfo/ProductInfo'
import { mockProducts } from '@/shared/constants'

export const ProductPage: FC = () => {
  return (
    <>
      <Backdrop>
        <ProductInfo product={mockProducts[0]} />
      </Backdrop>
    </>
  )
}
