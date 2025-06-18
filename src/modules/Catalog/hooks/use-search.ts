import { useDeferredValue, useState } from 'react'

export function useSearch() {
  const [query, setQuery] = useState<string>('')
  const deferredQuery = useDeferredValue<string>(query)

  return {
    deferredQuery,
    handleSetQuery: (value: string): void => setQuery(value),
  }
}
