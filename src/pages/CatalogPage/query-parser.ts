import { isNullable } from '@/shared/types/is-nullable.ts'
import { isType } from '@/shared/types/is-type.ts'

interface FilterObject {
  [key: string]: string[] | number[] | undefined
}

export function transformFilters(filters: FilterObject | string, direction: 'toString' | 'toObject'): FilterObject | string | never {
  if (isNullable(filters) || isNullable(direction)) {
    throw new Error('All args are required')
  }

  if (direction && (!isType<FilterObject>(filters) || !isType<string>(filters))) {
    throw new Error('Filter must be implement FilterObject | string types')
  }

  if (direction === 'toString' && isType<FilterObject>(filters)) {
    return convertQueryFromObjToString(filters)
  }

  if (direction === 'toObject' && typeof filters === 'string') {
    return convertQueryFromStringToObj(filters)
  }

  return ''
}

export function convertQueryFromObjToString(filters: FilterObject) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(filters)) {
    if (value && value.length > 0) {
      value.forEach(item => params.append(key, String(item)))
    }
  }

  return params.toString()
}

export function convertQueryFromStringToObj(filters: string) {
  const result: FilterObject = {}
  const params = new URLSearchParams(filters)

  for (const [key, value] of params.entries()) {
    if (!result[key]) {
      result[key] = []
    }

    if (key === 'price') {
      const num = Number(value)
      if (!Number.isNaN(num) && isType<number[]>(result[key])) {
        result[key].push(num)
      }
    }
    else if (isType<string[]>(result[key])) {
      result[key].push(value)
    }
  }

  return result
}
