import type { ClientResponse, CustomerSignInResult, MyCustomerSignin } from '@commercetools/platform-sdk'
import { cartStore } from '@/entities/cart/model/cart.store'
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

    if (response.body.cart) {
      cartStore.setCart(response.body.cart)
    }

    return response
  }
  catch {
    throw new Error('Failed to login customer')
  }
}
