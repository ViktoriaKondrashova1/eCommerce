import type { FilterData } from '../model/filter.types'
import { useEffect, useState } from 'react'
import { getAllCategories } from '@/entities/category/api/get-all-categories'
import { session } from '@/shared/lib/storage'
import { filterStore } from '../model/filter.store'
import { getAllBreweries } from './get-breweries-list'
import { getCountriesList } from './get-countries-list'
import { getPriceRange } from './get-price-range'

async function getData() {
  return Promise.all([
    getAllCategories(),
    getAllBreweries(),
    getCountriesList(),
    getPriceRange(),
    // getAbvRange(),
  ])
}

export function useFilter(): { isLoading: boolean, filterData: FilterData | null } {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [filterData, setFilterData] = useState<FilterData | null>(null)

  useEffect(() => {
    const loadData = async () => {
      if (!filterStore.isDataLoaded) {
        setIsLoading(true)

        try {
          const [categories, breweries, countries, price] = await getData()

          const data: FilterData = {
            categories: categories.body.results,
            breweries,
            countries,
            priceRange: price,
            // abvRange: abv,
          }

          filterStore.setFilterData(data)
          session.set('filter', data)

          setFilterData(data)
        }
        catch (error) {
          console.error('Failed to load filter data:', error)

          const savedData = session.get<FilterData>('filter')
          if (savedData) {
            filterStore.setFilterData(savedData)
            setFilterData(savedData)
          }
        }
        finally {
          setIsLoading(false)
        }
      }
      else {
        setFilterData(filterStore.filterData)
      }
    }

    void loadData()
  }, [])

  return { isLoading, filterData }
}
