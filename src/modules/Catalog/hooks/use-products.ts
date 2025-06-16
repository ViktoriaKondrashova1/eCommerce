import type { Category } from '@commercetools/platform-sdk'
import type { ICleanProduct } from '@/entities/product/model/product.types.ts'
import type { IFilterForm } from '@/modules/Catalog/hooks/use-filter-form.ts'
import { useCallback } from 'react'
import { fetchProducts } from '@/entities/product/api/fetch-products.ts'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter.ts'
import { useRequest } from '@/shared/hooks/use-request.ts'

interface Props {
  currentPage: number
  deferredQuery: string
  filters: IFilterForm
  isNeedApplyFilters: boolean
  selectedCategory: Category | undefined
}

export function useProducts({ currentPage, deferredQuery, filters, isNeedApplyFilters, selectedCategory }: Props) {
  const fetchProductsForPage = useCallback(async (): Promise<{
    products: ICleanProduct[]
    total: number
  }> => {
    const response = await fetchProducts({ page: currentPage, deferredQuery, filters, selectedCategory })
    const total = response.body.total ?? 0

    return {
      products: importProductAdapter(response.body.results),
      total,
    }
  }, [currentPage, deferredQuery, isNeedApplyFilters, selectedCategory])

  const {
    data: productsData,
    isLoading,
    isError,
  } = useRequest<{ products: ICleanProduct[], total: number }>(fetchProductsForPage)

  return { productsData, isLoading, isError }
}
