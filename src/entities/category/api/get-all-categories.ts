import type { CategoryPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

/**
 * getAllCategories:
 * 1. отправляем запрос к апи комерстулза, запрашиваем список категорий
 * 2. если все ок - возвращем полученные данные по категриям
 * 3. если нет - выбрасываем ошибку
 */
export async function getAllCategories(): Promise<ClientResponse<CategoryPagedQueryResponse>> {
  try {
    const response = await commerceApi.client
      .categories()
      .get()
      .execute()

    return response
  }
  catch {
    throw new Error('Failed to login customer')
  }
}
