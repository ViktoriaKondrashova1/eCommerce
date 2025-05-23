import type { ClientResponse, ProductProjection, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'
import { commerceApi } from '@/shared/configs/commerce-client'

export async function fetchProducts(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const allProducts: ProductProjection[] = []
  let offset = 0
  const limit = 20

  try {
    let hasMore = true

    while (hasMore) {
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

      if (typeof response.body.results === 'object' && response.body.results.length > 0) {
        allProducts.push(...response.body.results)

        hasMore = allProducts.length < (response.body.total ?? 0)
        offset += limit
      }
      else {
        hasMore = false
      }
    }

    return {
      body: {
        count: allProducts.length,
        total: allProducts.length,
        offset: 0,
        limit: allProducts.length,
        results: allProducts,
      },
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
