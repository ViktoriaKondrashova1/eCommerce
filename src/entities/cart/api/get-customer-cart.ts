import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function getCustomerCart(customerId: string): Promise<ClientResponse<Cart>> {
  try {
    const response = await commerceApi.client
      .carts()
      .withCustomerId({ customerId })
      .get()
      .execute()

    return response
  }
  catch {
    throw new Error('Failed to get a customer cart')
  }
}
