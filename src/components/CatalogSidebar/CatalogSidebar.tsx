import type { BaseComponent } from '@/shared/types/common.types'
import type { Category } from '@commercetools/platform-sdk'
import type { FC } from 'react'
import { getAllCategories } from '@/entities/category/api/get-all-categories'
import { globalStore } from '@/entities/global/model/global.store'
import { getAbvRange } from '@/entities/product/api/get-abv-range'
import { getAllBreweries } from '@/entities/product/api/get-breweries-list'
import { getCountriesList } from '@/entities/product/api/get-countries-list'
import { getPriceRange } from '@/entities/product/api/get-price-range'
import { Flex } from 'antd'
import { useEffect, useState } from 'react'
import { AppButton } from '../AppButton'
import { AppSkeleton } from '../AppSkeleton/AppSkeleton'
import { Backdrop } from '../Backdrop/Backdrop'
import { RangeFilter } from '../RangeFilter/RangeFilter'
import { SortingMenu } from '../SortingMenu/SortingMenu'

export const CatalogSidebar: FC<BaseComponent> = ({ testId = 'catalog-sidebar' }) => {
  const [categories, setCategories] = useState<Category[]>()
  const [breweries, setBreweries] = useState<string[]>()
  const [countries, setCountries] = useState<string[]>()
  const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 0 })
  const [abvRange, setAbvRange] = useState<{ min: number, max: number }>({ min: 0, max: 0 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        globalStore.setLoading(true)

        const [categoriesRes, breweriesRes, countriesRes, priceRes, abvRes] = await Promise.all([
          getAllCategories(),
          getAllBreweries(),
          getCountriesList(),
          getPriceRange(),
          getAbvRange(),
        ])

        setCategories(categoriesRes.body.results)
        setBreweries(breweriesRes)
        setCountries(countriesRes)
        setPriceRange(priceRes)
        setAbvRange(abvRes)
      }
      catch (error) {
        console.error('Error fetching data:', error)
      }
      finally {
        globalStore.setLoading(false)
      }
    }

    fetchData()
      .catch(error => console.error('Unhandled promise rejection:', error))
  }, [])

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

  if (globalStore.isLoading) {
    return (
      <AppSkeleton />
    )
  }

  return (
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
}
