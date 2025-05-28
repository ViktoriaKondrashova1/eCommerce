import type { FC } from 'react'
import type { IFilterForm, TFilterItemValue } from '@/pages/CatalogPage/use-filter-form.ts'
import type { BaseComponent } from '@/shared/types/common.types'
import { Drawer, Flex, Grid } from 'antd'
import { useState } from 'react'
import { useFilter } from '@/entities/filter/api/useFilter'
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
}

const { useBreakpoint } = Grid

export const CatalogSidebar: FC<Props> = ({ testId = 'catalog-sidebar', isFiltersVisible, setFiltersVisible, handleAcceptFilters, handleChangeFilterForm, handleResetFilterForm }) => {
  const { isLoading, filterData } = useFilter()
  const screens = useBreakpoint()
  const [isNeedReset, setIsNeedReset] = useState<boolean>(false)

  if (isLoading || !filterData) {
    return <AppSkeleton />
  }

  const {
    categories,
    breweries,
    countries,
    priceRange,
    abvRange,
  } = filterData

  const sortByPriceArr = ['Price: high - low', 'Price: low - high']

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
    <Backdrop>
      <Flex vertical gap="middle" data-testid={testId} style={{ width: 200 }}>
        <SortingSelect title="Sorting" options={sortByPriceOptions} isMultiple={false} onClick={value => handleChangeFilterForm({ key: 'sorting', value })} />
        <SortingSelect title="Style" options={sortByStyleOptions} onClick={value => handleChangeFilterForm({ key: 'style', value })} />
        <SortingSelect title="Brewery" options={sortByBreweryOptions} onClick={value => handleChangeFilterForm({ key: 'brewery', value })} />
        <SortingSelect title="Country" options={sortByCountryOptions} onClick={value => handleChangeFilterForm({ key: 'country', value })} />
        <RangeFilter
          title="Price, $"
          icon="$"
          minValue={priceRange.min}
          maxValue={priceRange.max}
          onChange={value => handleChangeFilterForm({ key: 'price', value })}
          shouldUpdate={isNeedReset}
        />
        <RangeFilter
          title="ABV, %"
          icon="%"
          minValue={abvRange.min}
          maxValue={abvRange.max}
          onChange={value => handleChangeFilterForm({ key: 'ABV', value })}
          shouldUpdate={isNeedReset}
        />
        <Flex vertical gap="small">
          <AppButton type="primary" onClick={handleAcceptFilters}>Accept</AppButton>
          <AppButton
            type="primary"
            onClick={() => {
              handleResetFilterForm()
              setIsNeedReset(prevState => !prevState)
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
