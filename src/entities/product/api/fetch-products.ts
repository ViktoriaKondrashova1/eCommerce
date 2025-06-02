import type { Category, ClientResponse, ProductProjectionPagedQueryResponse, QueryParam } from '@commercetools/platform-sdk'
import type { IFilterForm } from '@/pages/CatalogPage/use-filter-form'
import { categoryStore } from '@/entities/category/model/category.store'
import { commerceApi } from '@/shared/configs/commerce-client'
import { catalogPageLimit } from '@/shared/constants'

interface Props {
  page?: number
  deferredQuery?: string
  filters?: IFilterForm
  selectedCategory?: Category | undefined
}

interface queryProps {
  'limit': number
  'offset'?: number
  'where'?: string
  'text.en'?: string
  'filter'?: string[]
  [key: string]: QueryParam | undefined
}

export async function fetchProducts({
  page,
  deferredQuery,
  filters,
  selectedCategory,
}: Props): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  try {
    const MAX_LIMIT = 500
    const limit = page !== undefined ? catalogPageLimit : MAX_LIMIT
    const offset = page !== undefined ? (page - 1) * limit : undefined

    const queryArgs: queryProps = {
      limit,
      where: 'published=true',
    }

    if (deferredQuery !== undefined && deferredQuery?.trim() !== '') {
      queryArgs['text.en-US'] = `${deferredQuery?.trim()}`
      queryArgs.fuzzy = true
    }

    if (filters && filters?.sorting) {
      if (filters.sorting.includes('Price: high - low')) {
        queryArgs.sort = ['price desc']
      }
      else if (filters.sorting.includes('Price: low - high')) {
        queryArgs.sort = ['price asc']
      }
      else if (filters.sorting.includes('Name')) {
        queryArgs.sort = ['name.en-us asc']
      }
    }

    const filterConditions: string[] = []

    if (filters && filters?.brewery && filters.brewery.length > 0) {
      filterConditions.push(
        `variants.attributes.brewery:"${filters.brewery.join('","')}"`,
      )
    }

    if (filters && filters?.country && filters.country.length > 0) {
      filterConditions.push(
        `variants.attributes.country:"${filters.country.join('","')}"`,
      )
    }

    if (filters && filters?.style && filters.style.length > 0) {
      const styleIdsArr = filters.style.map((el) => {
        const foundCategory = categoryStore.getCategoryByName(el)
        return foundCategory?.id
      })

      filterConditions.push(
        `categories.id:"${styleIdsArr.join('","')}"`,
      )
    }

    if (filters && filters?.price) {
      const minInCent = filters.price[0] * 100
      const maxInCent = filters.price[1] * 100

      const priceFilter = `variants.prices.value.centAmount:range (${minInCent} to ${maxInCent})`
      const discountedPriceFilter = `variants.prices.discounted.value.centAmount:range (${minInCent} to ${maxInCent})`

      filterConditions.push(`${priceFilter}`)
      filterConditions.push(`${discountedPriceFilter}`)
    }

    // if (filters && filters?.ABV) {
    //   filterConditions.push(
    //     `variants.attributes.ABV:range (${filters.ABV[0]} to ${filters.ABV[1]})`,
    //   )
    // }

    if (offset !== undefined) {
      queryArgs.offset = offset
    }

    if (filterConditions.length > 0) {
      queryArgs.filter = filterConditions
      queryArgs.offset = undefined
      queryArgs.limit = MAX_LIMIT
    }

    if (selectedCategory !== undefined) {
      queryArgs.offset = undefined
      queryArgs.filter = [`categories.id:"${selectedCategory.id}"`]
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

export async function fetchProductBySlug(slug: string, locale: string = 'en-US'):
Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  try {
    const response = await commerceApi.client
      .productProjections()
      .get({
        queryArgs: {
          where: `slug(${locale}="${slug}")`,
          limit: 1,
        },
      })
      .execute()

    if (response.body.results.length === 0) {
      throw new Error(`Product with slug "${slug}" not found`)
    }

    return response
  }
  catch {
    throw new Error('Failed to fetch product by slug')
  }
}
