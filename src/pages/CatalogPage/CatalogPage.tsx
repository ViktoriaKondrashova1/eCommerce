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
import { useCatalogPage } from '@/pages/CatalogPage/use-catalog-page.ts'
import { useCategories } from '@/pages/CatalogPage/use-categories.ts'
import { useFilterForm } from '@/pages/CatalogPage/use-filter-form'
import { useProducts } from '@/pages/CatalogPage/use-products.ts'
import { useSearch } from '@/pages/CatalogPage/use-search.ts'
import { catalogPageLimit } from '@/shared/constants'

const { useBreakpoint } = Grid

export const CatalogPage: FC = () => {
  const { currentPage, handlePageChange } = useCatalogPage()
  const { deferredQuery, handleSetQuery } = useSearch()

  const {
    isNeedApplyFilters,
    filterForm,

    handleChangeFilterForm,
    handleAcceptFilters,
    handleResetFilterForm,
  } = useFilterForm()

  const { productsData, isLoading, isError } = useProducts({ currentPage, deferredQuery, filters: filterForm, isNeedApplyFilters })

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
      <Flex vertical gap="large" style={{ width: '100%' }}>
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
      <Flex justify="space-between" vertical={screens.xs} gap={screens.xs ? 'middle' : undefined}>
        <AppBreadcrumb />
        <CatalogSearch onChange={handleSetQuery} />
      </Flex>
      <Flex gap="large" style={{ marginTop: 40 }}>
        <CatalogSidebar
          isFiltersVisible={filterDrawerVisible}
          setFiltersVisible={setFilterDrawerVisible}
          handleChangeFilterForm={handleChangeFilterForm}
          handleAcceptFilters={handleAcceptFilters}
          handleResetFilterForm={handleResetFilterForm}
        />
        {Content}
      </Flex>
    </>
  )
}
