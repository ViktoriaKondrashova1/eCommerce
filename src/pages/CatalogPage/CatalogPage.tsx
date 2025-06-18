import type { FC } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { AppButton } from '@/components/AppButton'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import {
  CatalogPagination,
  CatalogSearch,
  CatalogSidebar,
  CategoriesNavigation,
  ProductList,

  useCatalogPage,
  useCategoriesNav,
  useFilterForm,
  useProducts,
  useSearch,
} from '@/modules/Catalog'
import { catalogPageLimit } from '@/shared/constants'
import { FilterOutlined } from '@ant-design/icons'

import { Flex, Grid } from 'antd'
import { useEffect, useState } from 'react'

import { useCategories } from '../MainPage/use-categories'

const { useBreakpoint } = Grid

export const CatalogPage: FC = () => {
  const { currentPage, handlePageChange } = useCatalogPage()
  const { deferredQuery, handleSetQuery } = useSearch()
  const [isNeedReset, setIsNeedReset] = useState<boolean>(false)

  useCategories()

  const {
    isNeedApplyFilters,
    filterForm,

    handleChangeFilterForm,
    handleAcceptFilters,
    handleResetFilterForm,
  } = useFilterForm()

  const { categories, selectedCategory, handleCategoryChange, resetCategory } = useCategoriesNav()

  const { productsData, isLoading, isError } = useProducts({ currentPage, deferredQuery, filters: filterForm, isNeedApplyFilters, selectedCategory })

  const [filterDrawerVisible, setFilterDrawerVisible] = useState<boolean>(false)
  const [categoriesDrawerVisible, setCategoriesDrawerVisible] = useState<boolean>(false)
  const screens = useBreakpoint()

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
                onClick={() => setCategoriesDrawerVisible(true)}
                style={{ width: '100px' }}
              >
                Categories
              </AppButton>
            )
          : null}
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
      <CategoriesNavigation
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={(e) => {
          handleResetFilterForm()
          setIsNeedReset(true)
          handleCategoryChange(e)
          setCategoriesDrawerVisible(false)
        }}
        categoriesDrawerVisible={categoriesDrawerVisible}
        setCategoriesDrawerVisible={setCategoriesDrawerVisible}
      />
      <Flex gap="large" style={{ marginTop: 20 }}>
        <CatalogSidebar
          isFiltersVisible={filterDrawerVisible}
          setFiltersVisible={setFilterDrawerVisible}
          handleChangeFilterForm={handleChangeFilterForm}
          handleAcceptFilters={handleAcceptFilters}
          handleResetFilterForm={handleResetFilterForm}
          resetCategory={resetCategory}
          isNeedReset={isNeedReset}
          setIsNeedReset={setIsNeedReset}
        />
        {Content}
      </Flex>
    </>
  )
}
