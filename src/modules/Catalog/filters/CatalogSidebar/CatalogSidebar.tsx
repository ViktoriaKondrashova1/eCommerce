import type { IFilterForm, TFilterItemValue } from '@/modules/Catalog/hooks/use-filter-form.ts'
import type { BaseComponent } from '@/shared/types/common.types.ts'
import type { FC } from 'react'
import { AppButton } from '@/components/AppButton'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton.tsx'
import { Backdrop } from '@/components/Backdrop/Backdrop.tsx'
import { useFilter } from '@/entities/filter/api/useFilter.ts'
import { Drawer, Flex, Grid } from 'antd'
import { RangeFilter } from './../RangeFilter/RangeFilter.tsx'
import { SortingSelect } from './../SortingSelect/SortingSelect.tsx'

interface Props extends BaseComponent {
  isFiltersVisible: boolean
  setFiltersVisible: (isVisible: boolean) => void
  handleChangeFilterForm: ({ key, value }: { key: keyof IFilterForm, value: TFilterItemValue }) => void
  handleAcceptFilters: () => void
  handleResetFilterForm: () => void
  resetCategory: () => void
  isNeedReset: boolean
  setIsNeedReset: (isNeedReset: boolean) => void
}

const { useBreakpoint } = Grid

export const CatalogSidebar: FC<Props> = ({
  testId = 'catalog-sidebar',
  isFiltersVisible,
  setFiltersVisible,
  handleAcceptFilters,
  handleChangeFilterForm,
  handleResetFilterForm,
  resetCategory,
  isNeedReset,
  setIsNeedReset,
}) => {
  const { isLoading, filterData } = useFilter()
  const screens = useBreakpoint()

  if (isLoading || !filterData) {
    return <AppSkeleton />
  }

  const {
    categories,
    breweries,
    countries,
    priceRange,
    // abvRange,
  } = filterData

  const sortByPriceArr = ['Price: high - low', 'Price: low - high', 'Name']

  const sortByPriceOptions = sortByPriceArr.map(elem => ({
    label: elem,
    value: elem,
  }))

  const sortByStyleOptions = categories?.map(category => ({
    label: category.name['en-US'],
    value: category.name['en-US'],
  })) || []

  const sortByBreweryOptions = breweries?.map(brewery => ({
    label: brewery,
    value: brewery,
  })) || []

  const sortByCountryOptions = countries?.map(country => ({
    label: country,
    value: country,
  })) || []

  const filtersContent = (
    <Backdrop style={{ margin: '0' }}>
      <Flex vertical gap="middle" data-testid={testId} style={{ width: 200 }}>
        <SortingSelect
          title="Sorting"
          options={sortByPriceOptions}
          isMultiple={false}
          onChange={(value) => {
            setIsNeedReset(false)
            handleChangeFilterForm({ key: 'sorting', value })
          }}
          shouldUpdate={isNeedReset}
        />
        <SortingSelect
          title="Style"
          options={sortByStyleOptions}
          onChange={(value) => {
            setIsNeedReset(false)
            handleChangeFilterForm({ key: 'style', value })
          }}
          shouldUpdate={isNeedReset}
        />
        <SortingSelect
          title="Brewery"
          options={sortByBreweryOptions}
          onChange={(value) => {
            setIsNeedReset(false)
            handleChangeFilterForm({ key: 'brewery', value })
          }}
          shouldUpdate={isNeedReset}
        />
        <SortingSelect
          title="Country"
          options={sortByCountryOptions}
          onChange={(value) => {
            setIsNeedReset(false)
            handleChangeFilterForm({ key: 'country', value })
          }}
          shouldUpdate={isNeedReset}
        />
        <RangeFilter
          title="Price, $"
          icon="$"
          minValue={priceRange.min}
          maxValue={priceRange.max}
          onChange={(value) => {
            setIsNeedReset(false)
            handleChangeFilterForm({ key: 'price', value })
          }}
          shouldUpdate={isNeedReset}
        />
        {/* <RangeFilter
          title="ABV, %"
          icon="%"
          minValue={abvRange.min}
          maxValue={abvRange.max}
          onChange={(value) => {
            setIsNeedReset(false)
            handleChangeFilterForm({ key: 'ABV', value })
          }}
          shouldUpdate={isNeedReset}
        /> */}
        <Flex vertical gap="small">
          <AppButton
            type="primary"
            onClick={() => {
              handleAcceptFilters()
              setFiltersVisible(false)
              resetCategory()
            }}
          >
            Accept
          </AppButton>
          <AppButton
            type="primary"
            onClick={() => {
              handleResetFilterForm()
              setIsNeedReset(true)
              setFiltersVisible(false)
              resetCategory()
            }}
          >
            Reset
          </AppButton>
        </Flex>
      </Flex>
    </Backdrop>
  )

  return (
    <>
      {screens.md
        ? (
            filtersContent
          )
        : (
            <Drawer
              title="Filters"
              placement="right"
              onClose={() => setFiltersVisible(false)}
              open={isFiltersVisible}
              width={300}
            >
              {filtersContent}
            </Drawer>
          )}
    </>
  )
}
