import type { Cart, CartAddLineItemAction, CartRemoveLineItemAction, ClientResponse } from '@commercetools/platform-sdk'
import type { updateCartProps } from '../model/cart.types'
import { commerceApi } from '@/shared/configs/commerce-client'
import { isNonNullable } from '@/shared/types/is-non-nullable'
import { isNullable } from '@/shared/types/is-nullable'
import { cartStore } from '../model/cart.store'
import { getCart } from './get-cart'

export async function updateCart({ action, productId, lineItemId, quantity }: updateCartProps): Promise<ClientResponse<Cart>> {
  const cartId = cartStore.getCartId()
  const cartVersion = cartStore.getCartVersion()

  if (isNullable(cartId) || isNullable(cartVersion)) {
    throw new Error('Cannot update cart - no active cart found')
  }

  let baseAction: CartAddLineItemAction | CartRemoveLineItemAction

  if (action === 'addLineItem') {
    if (!isNonNullable(productId))
      throw new Error('productId is required for addLineItem')
    baseAction = { action, productId, variantId: 1, quantity: quantity ?? 1 }
  }
  else if (action === 'removeLineItem') {
    if (!isNonNullable(lineItemId))
      throw new Error('lineItemId is required for removeLineItem')
    baseAction = quantity !== undefined
      ? { action, lineItemId, quantity }
      : { action, lineItemId }
  }
  else {
    throw new Error('Invalid action type')
  }

  try {
    const response = await commerceApi.client
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [baseAction],
        },
      })
      .execute()

    if (response.body.lineItems.length === 0) {
      await getCart(cartId)
    }
    else {
      cartStore.updateCart(response.body)
    }

    return response
  }
  catch {
    throw new Error('Failed to update a cart')
  }
}
