import type { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function getCustomerCart(): Promise<ClientResponse<Cart> | null> {
  try {
    const response = await commerceApi.client
      .me()
      .activeCart()
      .get()
      .execute()

    return response
  }
  catch {
    return null
  }
}
