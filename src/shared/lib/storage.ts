import { isNonNullable } from '@/shared/types/is-non-nullable'
import { isType } from '@/shared/types/is-type'

interface StorageProviderReturn {
  get: <T>(key: string) => T | null
  set: (key: string, value: string) => void
  remove: (key: string) => void
  clear: () => void
}

type StorageProvider = typeof localStorage | typeof sessionStorage

function storage({ provider }: { provider: StorageProvider }): StorageProviderReturn {
  return {
    get<T>(key: string): T | null {
      try {
        const item = provider.getItem(key)
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
        provider.setItem(key, JSON.stringify(value))
      }
      catch {
        throw new Error('Error setting item in storage')
      }
    },

    remove(key: string): void {
      try {
        provider.removeItem(key)
      }
      catch {
        throw new Error('Error removing item from storage')
      }
    },

    clear(): void {
      try {
        provider.clear()
      }
      catch {
        throw new Error('Error clearing storage')
      }
    },
  }
}

export const local = storage({ provider: localStorage })
export const session = storage({ provider: sessionStorage })
