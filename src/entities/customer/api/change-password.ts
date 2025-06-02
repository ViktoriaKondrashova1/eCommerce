import type { CustomerChangePassword } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function changePassword(data: CustomerChangePassword) {
  const res = await commerceApi.client
    .customers()
    .password()
    .post({
      body: data,
    })
    .execute()

  return res
}
