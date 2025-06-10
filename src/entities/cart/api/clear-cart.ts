import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'
import { isNullable } from '@/shared/types/is-nullable'
import { cartStore } from '../model/cart.store'
import { getCart } from './get-cart'

export async function clearCart(): Promise<ClientResponse<Cart>> {
  const cart = cartStore.getCart()
  const cartVersion = cartStore.getCartVersion()

  if (isNullable(cart) || isNullable(cartVersion)) {
    throw new Error('Cannot clear cart - no active cart found')
  }

  try {
    const response = await commerceApi.client
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version: cartVersion,
          actions: cart.lineItems.map(item => ({
            action: 'removeLineItem' as const,
            lineItemId: item.id,
          })),
        },
      })
      .execute()

    await getCart(cart.id)

    return response
  }
  catch {
    throw new Error('Failed to clear a cart')
  }
}
