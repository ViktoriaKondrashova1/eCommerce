import { useState } from 'react'

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

export function useFilterForm() {
  const [filterForm, setFilterForm] = useState<IFilterForm>(initialForm)
  const [isNeedApplyFilters, setIsNeedApplyFilters] = useState<boolean>(false)

  const handleChangeFilterForm = ({ key, value }: { key: keyof IFilterForm, value: TFilterItemValue }) => {
    setFilterForm(prevState => ({ ...prevState, [key]: value }))
  }

  const handleResetFilterForm = () => {
    setFilterForm(initialForm)
    setIsNeedApplyFilters(prev => !prev)
  }

  const handleAcceptFilters = () => {
    setIsNeedApplyFilters(prev => !prev)
  }

  return { filterForm, isNeedApplyFilters, handleChangeFilterForm, handleResetFilterForm, handleAcceptFilters }
}
