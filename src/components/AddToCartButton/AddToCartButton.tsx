import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { BaseComponent } from '@/shared/types/common.types'
import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useState } from 'react'
import { AppButton } from '@/components/AppButton/AppButton'
import { updateCart } from '@/entities/cart/api/update-cart'

interface Props extends BaseComponent {
  product: ICleanProduct
}

export const AddToCartButton: FC<Props> = ({ testId = 'add-to-cart', product }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setIsChecked(true)
    setTimeout(() => setIsChecked(false), 1000)

    updateCart({ action: 'addLineItem', productId: product.id, quantity: 1 })
      .catch((error) => {
        console.error('Failed to add to cart:', error)
      })
  }

  return (
    <Tooltip data-testid={testId} title="Add to Cart">
      <AppButton
        type="primary"
        shape="circle"
        icon={isChecked ? <CheckOutlined /> : <PlusOutlined />}
        onClick={handleAddToCart}
      />
    </Tooltip>
  )
}
