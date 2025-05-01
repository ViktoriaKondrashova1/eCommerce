import { isNonNullable } from '@/shared/types/is-non-nullable'
import { isType } from '@/shared/types/is-type'

export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      const result = JSON.parse(item ?? '{}')

      if (isNonNullable(result) && isType<T>(result)) {
        return result
      }

      return null
    }
    catch {
      return null
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    }
    catch {
      throw new Error('Error setting item in storage')
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    }
    catch {
      throw new Error('Error setting item from storage')
    }
  },

  clear(): void {
    try {
      localStorage.clear()
    }
    catch {
      throw new Error('Error clearing storage')
    }
  },
}
