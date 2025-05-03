import type { ClientResponse, CustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function loginCustomer(loginData: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
  try {
    const response = await commerceApi
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
