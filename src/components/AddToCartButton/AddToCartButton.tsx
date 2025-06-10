import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { AppButton } from '@/components/AppButton/AppButton'
import { updateCart } from '@/entities/cart/api/update-cart'
import { isNonNullable } from '@/shared/types/is-non-nullable'

interface Props extends BaseComponent {
  productId: string
  lineItemId?: string | null
}

export const AddToCartButton: FC<Props> = ({ testId = 'add-to-cart', productId, lineItemId }) => {
  const handleAddToCart = (e: React.MouseEvent): void => {
    e.stopPropagation()

    updateCart({
      action: 'addLineItem',
      productId,
    })
      .catch((error) => {
        console.error('Failed to add to cart:', error)
      })
  }

  return (
    <Tooltip data-testid={testId} title={isNonNullable(lineItemId) ? 'Already in Cart' : 'Add to Cart'}>
      <AppButton
        type="primary"
        shape="circle"
        icon={isNonNullable(lineItemId) ? <CheckOutlined /> : <PlusOutlined />}
        onClick={handleAddToCart}
        disabled={isNonNullable(lineItemId)}
      />
    </Tooltip>
  )
}
