import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { updateCart } from '@/entities/cart/api/update-cart'
import { useNotify } from '@/shared/hooks/use-notify'
import { isNullable } from '@/shared/types/is-nullable'
import { AppButton } from '../AppButton'

interface Props extends BaseComponent {
  productId: string
  lineItemId?: string | null
  quantity?: number
}

export const AddOrRemoveFormCartButton: FC<Props> = ({ testId = 'add-remove-cart', productId, lineItemId, quantity = 1 }) => {
  const { showSuccessNotify, showErrorNotify } = useNotify()
  const buttonText = isNullable(lineItemId) ? 'Add to Cart' : 'Remove from Cart'
  const clickAction = isNullable(lineItemId) ? 'addLineItem' : 'removeLineItem'

  const handleClick = (): void => {
    const successMessage = isNullable(lineItemId) ? 'added to' : 'removed from'

    updateCart({
      action: clickAction,
      productId,
      ...(!isNullable(lineItemId) && { lineItemId }),
      quantity,
    })
      .then(() =>
        showSuccessNotify(`The product has been ${successMessage} the cart`),
      )
      .catch((error) => {
        console.error(`Failed to ${buttonText.toLowerCase()}:`, error)
        showErrorNotify(`Failed to ${buttonText.toLowerCase()}`)
      })
  }

  return (
    <AppButton
      data-testid={testId}
      type="primary"
      icon={<ShoppingCartOutlined />}
      onClick={handleClick}
    >
      {buttonText}
    </AppButton>
  )
}
