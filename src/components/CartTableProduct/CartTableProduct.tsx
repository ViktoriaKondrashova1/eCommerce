import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import { Flex, Image } from 'antd'
import { useEffect, useState } from 'react'
import { getProductById } from '@/entities/product/api/fetch-products'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { isNullable } from '@/shared/types/is-nullable'
import { AppEmpty } from '../AppEmpty/AppEmpty'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'

interface Props {
  productId: string
}

export const CartTableProduct: FC<Props> = ({ productId }) => {
  const [product, setProduct] = useState<ICleanProduct | null>(null)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const cartProductResponse = await getProductById(productId)
        const cartProduct = cartProductResponse.body
        setProduct(importProductAdapter([cartProduct])[0])
      }
      catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    void loadProduct()
  }, [productId])

  if (isNullable(product)) {
    return <AppEmpty />
  }

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
