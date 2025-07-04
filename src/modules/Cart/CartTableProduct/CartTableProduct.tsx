import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { FC } from 'react'
import { getProductById } from '@/entities/product/api/fetch-products'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { isNullable } from '@/shared/types/is-nullable'
import { Flex, Image } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppEmpty } from '../../../components/AppEmpty/AppEmpty.tsx'
import { AppText } from '../../../components/AppText/AppText.tsx'
import { AppTitle } from '../../../components/AppTitle/AppTitle.tsx'
import './CartTableProduct.scss'

interface Props {
  productId: string
}

export const CartTableProduct: FC<Props> = ({ productId }) => {
  const [product, setProduct] = useState<ICleanProduct | null>(null)
  const navigate = useNavigate()

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
    <Flex className="cart-table-prduct" gap="middle">
      {firstImage && (
        <Image width={100} height={150} src={firstImage.url} />
      )}
      <Flex vertical>
        <AppTitle level={4} style={{ cursor: 'pointer' }} onClick={() => navigate(`/catalog/product/${product.slug}`)}>{product.title}</AppTitle>
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
