import type { ICleanProduct } from '@/entities/product/model/product.types.ts'
import type { IFilterForm } from '@/pages/CatalogPage/use-filter-form.ts'
import { useCallback } from 'react'
import { fetchProducts } from '@/entities/product/api/fetch-products.ts'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter.ts'
import { useRequest } from '@/shared/hooks/use-request.ts'

interface Props {
  currentPage: number
  deferredQuery: string
  filters: IFilterForm
  isNeedApplyFilters: boolean
}

export function useProducts({ currentPage, deferredQuery, filters, isNeedApplyFilters }: Props) {
  const fetchProductsForPage = useCallback(async (): Promise<{
    products: ICleanProduct[]
    total: number
  }> => {
    const response = await fetchProducts({ page: currentPage, deferredQuery, filters })
    const total = response.body.total ?? 0

    return {
      products: importProductAdapter(response.body.results),
      total,
    }
  }, [currentPage, deferredQuery, isNeedApplyFilters])

  const {
    data: productsData,
    isLoading,
    isError,
  } = useRequest<{ products: ICleanProduct[], total: number }>(fetchProductsForPage)

  return { productsData, isLoading, isError }
}
