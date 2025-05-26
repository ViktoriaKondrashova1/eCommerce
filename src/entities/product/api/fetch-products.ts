import type { ClientResponse, ProductProjectionPagedQueryResponse, QueryParam } from '@commercetools/platform-sdk'
import type { IFilterForm } from '@/pages/CatalogPage/use-filter-form'
import { categoryStore } from '@/entities/category/model/category.store'
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
  filters,
}: Props): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  try {
    const MAX_LIMIT = 500
    const limit = page !== undefined ? catalogPageLimit : MAX_LIMIT
    const offset = page !== undefined ? (page - 1) * limit : undefined

    const queryArgs: queryProps = {
      limit,
      where: 'published=true',
    }

    // console.log('here', filters)

    if (deferredQuery?.trim() !== '') {
      queryArgs['text.en-US'] = `${deferredQuery?.trim()}`
      queryArgs.fuzzy = true
    }

    if (filters?.sorting) {
      if (filters.sorting.includes('Price: high - low')) {
        queryArgs.sort = ['price desc']
      }
      else if (filters.sorting.includes('Price: low - high')) {
        queryArgs.sort = ['price asc']
      }
    }

    const filterConditions: string[] = []

    if (filters?.brewery && filters.brewery.length > 0) {
      filterConditions.push(
        `variants.attributes.brewery:"${filters.brewery.join('","')}"`,
      )
    }

    if (filters?.country && filters.country.length > 0) {
      filterConditions.push(
        `variants.attributes.country:"${filters.country.join('","')}"`,
      )
    }

    if (filters?.style && filters.style.length > 0) {
      const styleIdsArr = filters.style.map((el) => {
        const foundCategory = categoryStore.getCategoryByName(el)
        return foundCategory?.id
      })

      filterConditions.push(
        `categories.id:"${styleIdsArr.join('","')}"`,
      )
    }

    if (filterConditions.length > 0) {
      queryArgs.filter = filterConditions
    }

    if (offset !== undefined) {
      queryArgs.offset = offset
    }

    const response = await commerceApi.client
      .productProjections()
      .search()
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
