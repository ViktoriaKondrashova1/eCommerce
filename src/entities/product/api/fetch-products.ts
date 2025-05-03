import type { ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function fetchProducts(): Promise<ClientResponse<ProductPagedQueryResponse>> {
  try {
    const response = await commerceApi
      .products()
      .get()
      .execute()

    return response
  }
  catch {
    throw new Error('Failed to fetch products')
  }
}
