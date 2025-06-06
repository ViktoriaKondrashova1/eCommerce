import { commerceApi } from '@/shared/configs/commerce-client'
import { cartStore } from '../model/cart.store'

export async function createCart() {
  try {
    const response = await commerceApi.client
      .carts()
      .post({
        body: {
          currency: 'USD',
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
