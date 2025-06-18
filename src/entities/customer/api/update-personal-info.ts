import type {
  MyCustomerUpdate,
} from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function updateCustomerInfo(updatedData: MyCustomerUpdate) {
  const response = await commerceApi.client
    .me()
    .post({
      body: updatedData,
    })
    .execute()

  return response
}
