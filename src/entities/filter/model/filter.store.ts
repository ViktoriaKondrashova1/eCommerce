import type { FilterData } from './filter.types'
import { makeAutoObservable } from 'mobx'
import { session } from '@/shared/lib/storage'

class FilterStore {
  public isDataLoaded: boolean
  public filterData: FilterData | null

  constructor() {
    makeAutoObservable(this)
    this.isDataLoaded = false
    this.filterData = null

    this.loadData()
    this.hasData()
  }

  public setIsDataLoaded(isDataLoaded: boolean) {
    this.isDataLoaded = isDataLoaded
  }

  public setFilterData(filterData: FilterData) {
    this.filterData = filterData
    this.setIsDataLoaded(true)
  }

  hasData(): boolean {
    return this.isDataLoaded
  }

  clearData(): void {
    this.filterData = null
    this.setIsDataLoaded(false)
    session.remove('filter')
  }

  private loadData(): void {
    const savedFilterData = session.get<FilterData>('filter')
    if (savedFilterData instanceof Object && Object.keys(savedFilterData).length > 0) {
      this.filterData = savedFilterData
      this.setIsDataLoaded(true)
    }
  }
}

export const filterStore = new FilterStore()
