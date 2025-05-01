import { commerceApi } from '@/shared/configs/commerce-client'

export async function fetchProducts() {
  try {
    const response = await commerceApi
      .products()
      .get()
      .execute()

    return response
  }
  catch (error) {
    console.error('Ошибка при получении продуктов:', error)
  }
}
