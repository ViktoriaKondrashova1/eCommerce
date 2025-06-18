import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'
import { cartStore } from '../model/cart.store'

export async function createCart(): Promise<ClientResponse<Cart>> {
  try {
    const response = await commerceApi.client
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
          deleteDaysAfterLastModification: 5,
        },
      })
      .execute()

    cartStore.setCart(response.body)

    return response
  }
  catch {
    throw new Error('Failed to create a cart')
  }
}
