import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { FC } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { AppButton } from '@/components/AppButton'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { CatalogPagination } from '@/components/CatalogPagination/CatalogPagination'
import { CatalogSearch } from '@/components/CatalogSearch/CatalogSearch'
import { CatalogSidebar } from '@/components/CatalogSidebar/CatalogSidebar'
import { ProductList } from '@/components/ProductList/ProductList'
import { fetchProducts } from '@/entities/product/api/fetch-products'
import { importProductAdapter, useCategories } from '@/shared/adapters/import/product.adapter'
import { catalogPageLimit } from '@/shared/constants'
import { useRequest } from '@/shared/hooks/useRequest'
import { FilterOutlined } from '@ant-design/icons'
import { Flex, Grid } from 'antd'
import { useCallback, useEffect, useState } from 'react'

const { useBreakpoint } = Grid

export const CatalogPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false)
  const screens = useBreakpoint()

  useCategories()

  const fetchProductsForPage = useCallback(async (): Promise<{
    products: ICleanProduct[]
    total: number
  }> => {
    const response = await fetchProducts(currentPage)
    const total = response.body.total ?? 0

    return {
      products: importProductAdapter(response.body.results),
      total,
    }
  }, [currentPage])

  const {
    data: productsData,
    isLoading,
    isError,
  } = useRequest<{ products: ICleanProduct[], total: number }>(fetchProductsForPage)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  return (
    <>
      <Flex justify="space-between">
        <AppBreadcrumb />
        <CatalogSearch />
      </Flex>
      <Flex gap="large" style={{ marginTop: 40 }}>
        <CatalogSidebar isFiltersVisible={filterDrawerVisible} setFiltersVisible={setFilterDrawerVisible} />
        {isLoading
          ? (
              <AppSkeleton />
            )
          : isError
            ? (
                <AppEmpty />
              )
            : (
                <Flex vertical gap="large">
                  {!screens.md
                    ? (
                        <AppButton
                          icon={<FilterOutlined />}
                          onClick={() => setFilterDrawerVisible(true)}
                          style={{ width: '100px' }}
                        >
                          Filters
                        </AppButton>
                      )
                    : null}
                  <ProductList products={productsData?.products || []} />
                  <CatalogPagination
                    total={productsData?.total !== undefined ? productsData.total : 0}
                    pageLimit={catalogPageLimit}
                    current={currentPage}
                    onChange={handlePageChange}
                  />
                </Flex>
              )}
      </Flex>
    </>
  )
}
