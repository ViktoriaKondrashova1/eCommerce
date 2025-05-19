import type { ClientResponse, CustomerSignInResult, MyCustomerSignin } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function loginCustomer(loginData: MyCustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
  try {
    const response = await commerceApi.client
      .me()
      .login()
      .post({
        body: loginData,
      })
      .execute()

    return response
  }
  catch {
    throw new Error('Failed to login customer')
  }
}
