import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import { Flex, Image } from 'antd'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'

interface Props {
  product: ICleanProduct
}

export const CartTableProduct: FC<Props> = ({ product }) => {
  const firstImage = product.images?.[0]

  return (
    <Flex gap="middle">
      {firstImage && (
        <Image width={100} height={150} src={firstImage.url} />
      )}
      <Flex vertical>
        <AppTitle level={4}>{product.title}</AppTitle>
        <AppText>{product.brewery}</AppText>
        <AppText>
          {product.category}
          , ABV
          {' '}
          {product.ABV}
        </AppText>
      </Flex>
    </Flex>
  )
}
