import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Drawer, Flex, Grid } from 'antd'
import { useFilter } from '@/entities/filter/api/useFilter'
import { AppButton } from '../AppButton'
import { AppSkeleton } from '../AppSkeleton/AppSkeleton'
import { Backdrop } from '../Backdrop/Backdrop'
import { RangeFilter } from '../RangeFilter/RangeFilter'
import { SortingMenu } from '../SortingMenu/SortingMenu'

interface Props extends BaseComponent {
  isFiltersVisible: boolean
  setFiltersVisible: (isVisible: boolean) => void
}

const { useBreakpoint } = Grid

export const CatalogSidebar: FC<Props> = ({ testId = 'catalog-sidebar', isFiltersVisible, setFiltersVisible }) => {
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
    abvRange,
  } = filterData

  const sortByPriceItems = [
    {
      key: 'sub1',
      label: 'Sorting',
      children: [
        { key: '1', label: 'Price: high - low' },
        { key: '2', label: 'Price: low - high' },
      ],
    },
  ]

  const sortByStyleItems = [
    {
      key: 'sub2',
      label: 'Style',
      children: categories?.map(category => ({ key: category.id, label: category.name['en-US'] })),
    },
  ]

  const sortByBreweryItems = [
    {
      key: 'sub3',
      label: 'Brewery',
      children: breweries?.map((brewery, idx) => ({ key: idx.toString(), label: brewery })),
    },
  ]

  const sortByCountryItems = [
    {
      key: 'sub4',
      label: 'Country',
      children: countries?.map((country, idx) => ({ key: idx.toString(), label: country })),
    },
  ]

  const filtersContent = (
    <Backdrop>
      <Flex vertical data-testid={testId} style={{ width: 200 }}>
        <SortingMenu items={sortByPriceItems} />
        <SortingMenu items={sortByStyleItems} />
        <SortingMenu items={sortByBreweryItems} />
        <SortingMenu items={sortByCountryItems} />
        <RangeFilter
          title="Price, $"
          icon="$"
          minValue={priceRange.min}
          maxValue={priceRange.max}
        />
        <RangeFilter
          title="ABV, %"
          icon="%"
          minValue={abvRange.min}
          maxValue={abvRange.max}
        />
        <Flex vertical gap="small">
          <AppButton type="primary">Accept</AppButton>
          <AppButton type="primary">Reset</AppButton>
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
