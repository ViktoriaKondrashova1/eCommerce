import type { FC } from 'react'
import type { IFilterForm, TFilterItemValue } from '@/pages/CatalogPage/use-filter-form.ts'
import type { BaseComponent } from '@/shared/types/common.types'
import { Drawer, Flex, Grid } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFilter } from '@/entities/filter/api/useFilter'
import { convertQueryFromStringToObj } from '@/pages/CatalogPage/query-parser.ts'
import { isType } from '@/shared/types/is-type.ts'
import { AppButton } from '../AppButton'
import { AppSkeleton } from '../AppSkeleton/AppSkeleton'
import { Backdrop } from '../Backdrop/Backdrop'
import { RangeFilter } from '../RangeFilter/RangeFilter'
import { SortingSelect } from '../SortingSelect/SortingSelect'

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

function getSafelyInitialValue<T,>(data: (string | number)[] | undefined): T[] | [] {
  if (!Array.isArray(data) || !isType<T[]>(data)) {
    return []
  }

  return Array.isArray(data) ? data : []
}

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
  const navigate = useNavigate()
  const { isLoading, filterData } = useFilter()
  const screens = useBreakpoint()
  const [searchParams] = useSearchParams()
  const parsedQuery = convertQueryFromStringToObj(searchParams.toString())

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
          initialValue={getSafelyInitialValue<string>(parsedQuery?.sorting)}
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
          initialValue={getSafelyInitialValue<string>(parsedQuery?.style)}
          options={sortByStyleOptions}
          onChange={(value) => {
            setIsNeedReset(false)
            handleChangeFilterForm({ key: 'style', value })
          }}
          shouldUpdate={isNeedReset}
        />
        <SortingSelect
          initialValue={getSafelyInitialValue<string>(parsedQuery?.brewery)}
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
          initialValue={getSafelyInitialValue<string>(parsedQuery?.country)}
          options={sortByCountryOptions}
          onChange={(value) => {
            setIsNeedReset(false)
            handleChangeFilterForm({ key: 'country', value })
          }}
          shouldUpdate={isNeedReset}
        />
        <RangeFilter
          initialValue={getSafelyInitialValue<number>(parsedQuery?.price)}
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
              navigate('/catalog/1')
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
