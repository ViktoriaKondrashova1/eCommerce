import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { checkCartExists } from '@/entities/cart/api/check-сart-exists'
import { createCart } from '@/entities/cart/api/create-cart'
import { cartStore } from '@/entities/cart/model/cart.store'
import { commerceApi } from '@/shared/configs/commerce-client'
import { isNullable } from '@/shared/types/is-nullable'

export async function getOrCreateCart(): Promise<ClientResponse<Cart>> {
  const currentCartId = cartStore.getCartId()

  if (!isNullable(currentCartId) && await checkCartExists(currentCartId)) {
    try {
      return await commerceApi.client
        .carts()
        .withId({ ID: currentCartId })
        .get()
        .execute()
    }
    catch {
      throw new Error('Failed to get or create cart')
    }
  }

  return createCart()
}
