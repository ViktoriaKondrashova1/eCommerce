import type { ClientResponse, CustomerSignInResult, MyCustomerDraft } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function registerCustomer(customerData: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
  const response = await commerceApi.client
    .me()
    .signup()
    .post({
      body: customerData,
    })
    .execute()

  return response
}
