import type { ClientResponse, CustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

/**
 * логин:
 * 1. отправляем запрос к апи комерстулза, передаем логин и пароль (loginData)
 * 2. если все гуд - возвращем данные юзера
 * 3. если нет - выбрасываем ошибку
 */
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
