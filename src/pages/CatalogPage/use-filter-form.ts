import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { convertQueryFromObjToString, convertQueryFromStringToObj } from '@/pages/CatalogPage/query-parser.ts'
import { isType } from '@/shared/types/is-type.ts'

type TFilterItemString = undefined | string[]

type TFilterItemValueRange = undefined | [number, number]
export type TFilterItemValue = TFilterItemString | TFilterItemValueRange

export interface IFilterForm {
  sorting: TFilterItemString
  style: TFilterItemString
  brewery: TFilterItemString
  country: TFilterItemString
  price: TFilterItemValueRange
  ABV: TFilterItemValueRange
}

const initialForm = {
  sorting: undefined,
  style: undefined,
  brewery: undefined,
  country: undefined,
  price: undefined,
  ABV: undefined,
}

interface FilterObject {
  [key: string]: string[] | number[] | undefined
}

export function useFilterForm() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = ((): IFilterForm => {
    const parsedObj = convertQueryFromStringToObj(searchParams.toString())
    if (!isType<IFilterForm>(parsedObj)) {
      throw new Error('Broken parsed query')
    }
    return parsedObj
  })()

  const [filterForm, setFilterForm] = useState<IFilterForm>(initialQuery)
  const [isNeedApplyFilters, setIsNeedApplyFilters] = useState<boolean>(false)

  const handleChangeFilterForm = ({ key, value }: { key: keyof IFilterForm, value: TFilterItemValue }) => {
    const updatedForm = { ...filterForm, [key]: value }

    setFilterForm(() => updatedForm)
    updateQuery(updatedForm)
  }

  function updateQuery(filterForm: FilterObject): void {
    const strQuery = convertQueryFromObjToString(filterForm)
    setSearchParams(strQuery)
  }

  const handleResetFilterForm = () => {
    setFilterForm(initialForm)
    setIsNeedApplyFilters(prev => !prev)
    setSearchParams(convertQueryFromObjToString(initialForm))
  }

  const handleAcceptFilters = () => {
    setIsNeedApplyFilters(prev => !prev)
  }

  return { filterForm, isNeedApplyFilters, handleChangeFilterForm, handleResetFilterForm, handleAcceptFilters }
}
