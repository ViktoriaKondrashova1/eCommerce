import type { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'
import { catalogPageLimit } from '@/shared/constants'

/**
 fetchProducts:
 * 1. если передан аргумент page - получаем продукты на конкретную страницу, если не передан - получаем все 38 продуктов
 * 4. productProjections - вызывает апи комерстулза и получает список всех товаров
 * 5. .get().execute() - отправляем запрос и получаем данные
 * 6. в .get() прописываем limit, offset и статус опубликованных продуктов, которые хотим получить
 * 4. если все ок - вернем товары в формате, который соответствует типу ProductProjectionPagedQueryResponse, если нет - выбросим ошибку
 */

export async function fetchProducts(page?: number): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  try {
    const MAX_LIMIT = 500

    if (page !== undefined) {
      const limit = catalogPageLimit
      const offset = (page - 1) * limit

      const response = await commerceApi.client
        .productProjections()
        .get({
          queryArgs: {
            limit,
            offset,
            where: 'published=true',
          },
        })
        .execute()

      return response
    }
    else {
      const response = await commerceApi.client
        .productProjections()
        .get({
          queryArgs: {
            limit: MAX_LIMIT,
            where: 'published=true',
          },
        })
        .execute()

      return response
    }
  }
  catch {
    throw new Error('Failed to fetch products')
  }
}

export async function fetchPublishedProductsById(categoryId: string, settings?: { limit: number, offset: number, sort: string }): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const { limit = 38, offset = 0, sort = 'ASC' } = settings ?? {}

  try {
    const response = await commerceApi.client
      .productProjections()
      .get({
        queryArgs: {
          where: `categories(id="${categoryId}") AND published=true`,
          limit,
          offset,
          sort,
        },
      })
      .execute()

    return response
  }
  catch {
    throw new Error('Failed to fetch filtered published products')
  }
}
