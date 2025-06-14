import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useEffect, useState } from 'react'
import { updateOrCreateCart } from '@/entities/cart/api/update-or-create-cart'
import { getProductById } from '@/entities/product/api/fetch-products'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { isNonNullable } from '@/shared/types/is-non-nullable'
import { isNullable } from '@/shared/types/is-nullable'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'

interface Props {
  productId: string
  lineItemId?: string
  quantity?: number
}

export const Incrementer: FC<Props> = ({ quantity = 1, productId, lineItemId }) => {
  const [productQuantity, setProductQuantity] = useState<number>(quantity)
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

  if (isNullable(product))
    return

  const updateCartItem = async (action: 'addLineItem' | 'removeLineItem', quantity: number) => {
    try {
      await updateOrCreateCart({
        action,
        productId,
        ...(isNonNullable(lineItemId) && { lineItemId }),
        quantity,
      })
    }
    catch (error) {
      console.error('Failed to update cart:', error)
    }
  }

  const decreaseQuantity = () => {
    if (productQuantity > 1) {
      const prevQty = productQuantity
      setProductQuantity(prevQty - 1)
      updateCartItem('removeLineItem', 1).catch(() => setProductQuantity(prevQty))
    }
  }

  const increaseQuantity = () => {
    const prevQty = productQuantity
    setProductQuantity(prevQty + 1)
    updateCartItem('addLineItem', 1).catch(() => setProductQuantity(prevQty))
  }

  return (
    <Flex gap="small" align="center">
      <AppButton
        shape="circle"
        icon={<MinusOutlined />}
        onClick={decreaseQuantity}
        disabled={productQuantity <= 1}
      />
      <AppText>{productQuantity}</AppText>
      <AppButton
        shape="circle"
        icon={<PlusOutlined />}
        onClick={increaseQuantity}
      />
    </Flex>
  )
}
