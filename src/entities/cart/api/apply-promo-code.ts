import { commerceApi } from '@/shared/configs/commerce-client'
import { isNullable } from '@/shared/types/is-nullable'
import { cartStore } from '../model/cart.store'

export async function applyPromoCode(promoCode: string): Promise<void> {
  const cartId = cartStore.getCartId()
  const cartVersion = cartStore.getCartVersion()

  if (isNullable(cartId) || isNullable(cartVersion)) {
    throw new Error('Failed to find an active cart')
  }
  try {
    const response = await commerceApi.client
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [{
            action: 'addDiscountCode',
            code: promoCode,
          }],
        },
      })
      .execute()

    cartStore.updateCart(response.body)
  }
  catch {
    throw new Error(`Failed to apply promocode`)
  }
}
