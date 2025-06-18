import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'
import { cartStore } from '../model/cart.store'

export async function getCart(cartId: string): Promise<ClientResponse<Cart>> {
  try {
    const response = await commerceApi.client
      .me()
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute()

    cartStore.setCart(response.body)

    return response
  }
  catch {
    throw new Error('Failed to get a cart')
  }
}
