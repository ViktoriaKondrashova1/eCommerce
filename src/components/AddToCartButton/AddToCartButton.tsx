import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useState } from 'react'
import { AppButton } from '@/components/AppButton/AppButton'
import { updateOrCreateCart } from '@/entities/cart/api/update-or-create-cart'
import { isNonNullable } from '@/shared/types/is-non-nullable'

interface Props extends BaseComponent {
  productId: string
  lineItemId?: string | null
}

export const AddToCartButton: FC<Props> = ({ testId = 'add-to-cart', productId, lineItemId }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleAddToCart = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation()
    setLoading(true)

    try {
      await updateOrCreateCart({
        action: 'addLineItem',
        productId,
      })
    }
    catch (error) {
      console.error('Failed to add to cart:', error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Tooltip data-testid={testId} title={isNonNullable(lineItemId) ? 'Already in Cart' : 'Add to Cart'}>
      <AppButton
        type="primary"
        shape="circle"
        icon={isNonNullable(lineItemId) ? <CheckOutlined /> : <PlusOutlined />}
        onClick={e => void handleAddToCart(e)}
        disabled={isNonNullable(lineItemId)}
        loading={loading}
      />
    </Tooltip>
  )
}
