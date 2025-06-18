import { isNullable } from './is-nullable'

export function isNonNullable(value: unknown): value is Exclude<typeof value, null | undefined | string> {
  return !isNullable(value)
}
