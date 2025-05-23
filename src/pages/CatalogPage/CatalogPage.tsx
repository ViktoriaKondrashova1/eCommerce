import type { FC } from 'react'
import { FilterOutlined } from '@ant-design/icons'
import { Flex, Grid } from 'antd'
import { useEffect, useState } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { AppButton } from '@/components/AppButton'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { CatalogPagination } from '@/components/CatalogPagination/CatalogPagination'
import { CatalogSearch } from '@/components/CatalogSearch/CatalogSearch'
import { CatalogSidebar } from '@/components/CatalogSidebar/CatalogSidebar'
import { ProductList } from '@/components/ProductList/ProductList'
import { catalogPageLimit } from '@/shared/constants'
import { useCatalogPage } from './use-catalog-page'
import { useCategories } from './use-categories'
import { useProducts } from './use-products'
import { useSearch } from './use-search'

const { useBreakpoint } = Grid

export const CatalogPage: FC = () => {
  const { currentPage, handlePageChange } = useCatalogPage()
  const { deferredQuery, handleSetQuery } = useSearch()

  const { productsData, isLoading, isError } = useProducts({ currentPage, deferredQuery })

  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false)
  const screens = useBreakpoint()
  useCategories()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const Content = (() => {
    if (isError)
      return <AppEmpty />
    if (isLoading)
      return <AppSkeleton />

    return (
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
    )
  })()

  return (
    <>
      <Flex justify="space-between">
        <AppBreadcrumb />
        <CatalogSearch onChange={handleSetQuery} />
      </Flex>
      <Flex gap="large" style={{ marginTop: 40 }}>
        <CatalogSidebar
          isFiltersVisible={filterDrawerVisible}
          setFiltersVisible={setFilterDrawerVisible}
        />
        {Content}
      </Flex>
    </>
  )
}
