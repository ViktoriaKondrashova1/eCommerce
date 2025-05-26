import type { ClientResponse, Customer } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function fetchMe(): Promise<ClientResponse<Customer>> {
  const response = await commerceApi.client
    .me()
    .get()
    .execute()

  return response
}
