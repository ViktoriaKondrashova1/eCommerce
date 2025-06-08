import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'
import { isNonNullable } from '@/shared/types/is-non-nullable'
import { isNullable } from '@/shared/types/is-nullable'
import { cartStore } from '../model/cart.store'

type ActionType = 'addLineItem' | 'removeLineItem' | 'changeLineItemQuantity'

interface Props {
  action: ActionType
  productId: string
  lineItemId?: string
  quantity: number
}

export async function updateCart({ action, productId, lineItemId, quantity }: Props): Promise<ClientResponse<Cart>> {
  const cartId = cartStore.getCartId()
  const cartVersion = cartStore.getCartVersion()

  if (isNullable(cartId) || isNullable(cartVersion)) {
    throw new Error('Cannot update cart - no active cart found')
  }

  try {
    const response = await commerceApi.client
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [{
            action,
            productId,
            ...(isNonNullable(lineItemId) && { lineItemId }),
            variantId: 1,
            quantity,
          }],
        },
      })
      .execute()

    cartStore.updateCart(response.body)

    return response
  }
  catch {
    throw new Error('Failed to update a cart')
  }
}
