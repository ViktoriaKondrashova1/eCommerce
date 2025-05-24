import type { ClientResponse, ProductProjectionPagedQueryResponse, QueryParam } from '@commercetools/platform-sdk'
import type { IFilterForm } from '@/pages/CatalogPage/use-filter-form'
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

interface Props {
  page?: number
  deferredQuery?: string
  filters?: IFilterForm
}

interface queryProps {
  'limit': number
  'offset'?: number
  'where'?: string
  'text.en'?: string
  [key: string]: QueryParam | undefined
}

export async function fetchProducts({
  page,
  deferredQuery,
  filters: _filters,
}: Props): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  try {
    const MAX_LIMIT = 500
    const limit = page !== undefined ? catalogPageLimit : MAX_LIMIT
    const offset = page !== undefined ? (page - 1) * limit : undefined

    const queryArgs: queryProps = {
      limit,
      where: 'published=true',
    }

    if (deferredQuery?.trim() !== '') {
      queryArgs['text.en'] = deferredQuery
    }

    if (offset !== undefined) {
      queryArgs.offset = offset
    }

    const response = await commerceApi.client
      .productProjections()
      .get({ queryArgs })
      .execute()

    return response
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
