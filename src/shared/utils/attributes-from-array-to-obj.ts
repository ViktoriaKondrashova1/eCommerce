import type { Attribute } from '@/shared/types/common.types'

export function transformAttrsFromArrayToObj(attrsArray: Attribute[]): Record<string, string> {
  return attrsArray?.reduce((acc, current) => {
    acc = { ...acc, [current?.name]: current?.value }

    return acc
  }, {})
}
