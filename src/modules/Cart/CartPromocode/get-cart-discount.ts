import type { ClientResponse, DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function getDiscountCodes(): Promise<ClientResponse<DiscountCodePagedQueryResponse>> {
  try {
    const response = await commerceApi.client
      .discountCodes()
      .get()
      .execute()

    return response
  }
  catch {
    throw new Error('Failed to get a cart discount')
  }
}
