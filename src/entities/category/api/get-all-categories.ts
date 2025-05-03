import type { CategoryPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function getAllCategories(): Promise<ClientResponse<CategoryPagedQueryResponse>> {
  try {
    const response = await commerceApi
      .categories()
      .get()
      .execute()

    return response
  }
  catch {
    throw new Error('Failed to login customer')
  }
}
