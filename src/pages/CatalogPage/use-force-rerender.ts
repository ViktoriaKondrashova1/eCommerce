import { useReducer } from 'react'

export function useForceRerender() {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0)
  return forceUpdate
}
