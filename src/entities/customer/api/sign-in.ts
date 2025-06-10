import type { ClientResponse, CustomerSignInResult, MyCustomerSignin } from '@commercetools/platform-sdk'
import { cartStore } from '@/entities/cart/model/cart.store'
import { commerceApi } from '@/shared/configs/commerce-client'
import { isNonNullable } from '@/shared/types/is-non-nullable'

export async function loginCustomer(loginData: MyCustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
  const anonymousCartId = cartStore.getCartId()

  try {
    const response = await commerceApi.client
      .me()
      .login()
      .post({
        body: {
          ...loginData,
          activeCartSignInMode: 'MergeWithExistingCustomerCart',
          ...(isNonNullable(anonymousCartId) && { anonymousCartId }),
          updateProductData: true,
        },
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
