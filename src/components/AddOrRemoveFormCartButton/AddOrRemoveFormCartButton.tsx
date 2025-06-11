import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { updateOrCreateCart } from '@/entities/cart/api/update-or-create-cart'
import { useNotify } from '@/shared/hooks/use-notify'
import { isNullable } from '@/shared/types/is-nullable'
import { AppButton } from '../AppButton'

interface Props extends BaseComponent {
  productId: string
  lineItemId?: string | null
  quantity?: number
}

export const AddOrRemoveFormCartButton: FC<Props> = ({ testId = 'add-remove-cart', productId, lineItemId, quantity = 1 }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { showSuccessNotify, showErrorNotify } = useNotify()
  const buttonText = isNullable(lineItemId) ? 'Add to Cart' : 'Remove from Cart'
  const clickAction = isNullable(lineItemId) ? 'addLineItem' : 'removeLineItem'

  const handleClick = async (): Promise<void> => {
    const successMessage = isNullable(lineItemId) ? 'added to' : 'removed from'
    setLoading(true)

    try {
      await updateOrCreateCart({
        action: clickAction,
        productId,
        ...(!isNullable(lineItemId) && { lineItemId }),
        quantity,
      }).then(() =>
        showSuccessNotify(`The product has been ${successMessage} the cart`),
      )
    }
    catch (error) {
      console.error(`Failed to ${buttonText.toLowerCase()}:`, error)
      showErrorNotify(`Failed to ${buttonText.toLowerCase()}`)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <AppButton
      data-testid={testId}
      type="primary"
      icon={<ShoppingCartOutlined />}
      onClick={() => void handleClick()}
      loading={loading}
    >
      {buttonText}
    </AppButton>
  )
}
