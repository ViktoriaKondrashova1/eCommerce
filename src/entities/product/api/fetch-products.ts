import type { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'
import { catalogPageLimit } from '@/shared/constants'

/**
 fetchProducts:
 * 1. получаем все продукты
   2. создаем массив для всех продуктов, по дефолту пустой
   3. флаг hasMore для того, чтобы проверить закинулись ли 20 продуктов по лимиту, если да - то накопим в массив остальные
 * 4. productProjections - вызывает апи комерстулза и получает список всех товаров
 * 5. .get().execute() - отправляем запрос и получаем данные
 * 6. в .get() прописываем limit, offset и статус опубликованных продуктов, которые хотим получить
 * 4. если все ок - вернем товары в формате, который соответствует типу ProductProjectionPagedQueryResponse, если нет - выбросим ошибку
 */
// export async function fetchProducts(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
//   const allProducts: ProductProjection[] = []
//   let offset = 0
//   const limit = 20

//   try {
//     let hasMore = true

//     while (hasMore) {
//       const response = await commerceApi
//         .productProjections()
//         .get({
//           queryArgs: {
//             limit,
//             offset,
//             where: 'published=true',
//           },
//         })
//         .execute()

//       if (typeof response.body.results === 'object' && response.body.results.length > 0) {
//         allProducts.push(...response.body.results)

//         hasMore = allProducts.length < (response.body.total ?? 0)
//         offset += limit
//       }
//       else {
//         hasMore = false
//       }
//     }

//     return {
//       body: {
//         count: allProducts.length,
//         total: allProducts.length,
//         offset: 0,
//         limit: allProducts.length,
//         results: allProducts,
//       },
//     }
//   }
//   catch {
//     throw new Error('Failed to fetch products')
//   }
// }

export async function fetchProducts(page?: number): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  try {
    const MAX_LIMIT = 500

    if (page !== undefined) {
      const limit = catalogPageLimit
      const offset = (page - 1) * limit

      const response = await commerceApi
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
      const response = await commerceApi
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

/**
 fetchPublishedProductsById:
   1. получаем опубликованные товары по категории
   2. принимеам айдишник категории, чтобы получить товары только из нее
   3. опционально: settings {limit, offset, sort} - лимит продуктов на странице, офсет начиная с первого товара в категории и сортировка
   4. создаем запрос, добавляем фильтр where: "categories(id=...)" по айдишнику категории
   5. отправялем запрос через .get({ queryArgs: ... }).execute()
   6. возвращем товапры, если все ок, если нет - выбрасываем ошибку
 */
export async function fetchPublishedProductsById(categoryId: string, settings?: { limit: number, offset: number, sort: string }): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const { limit = 38, offset = 0, sort = 'ASC' } = settings ?? {}

  try {
    const response = await commerceApi
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
