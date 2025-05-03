import type { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function registerCustomer(customerData: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
  try {
    const response = await commerceApi
      .customers()
      .post({
        body: customerData,
      })
      .execute()

    return response
  }
  catch {
    throw new Error('Failed to register customer')
  }
}
