import type { Attribute } from '@/shared/types/common.types'

// преобразуем массив наших кастомных аттрибутов к объекту
export function transformAttrsFromArrayToObj(attrsArray: Attribute[]): Record<string, string> {
  return attrsArray?.reduce((acc, current) => {
    acc = { ...acc, [current?.name]: current?.value }

    return acc
  }, {})
}
