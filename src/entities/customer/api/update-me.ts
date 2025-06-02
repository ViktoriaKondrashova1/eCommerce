import type {
  MyCustomerUpdate,
} from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function updateMe(body: MyCustomerUpdate) {
  const res = await commerceApi.client
    .me()
    .post({
      body,
    })
    .execute()

  return res
}
