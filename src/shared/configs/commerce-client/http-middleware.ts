import type { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'
import { requestProvider } from './request-provider'

/**
 * получаем host из енва из перменной VITE_CTP_API_URL
 * проверяем, что хост определен
 * возвращаем объект с настройкамим: host и fetch
 */
export function getHttpMiddlewareOptions(): HttpMiddlewareOptions {
  const host = import.meta.env.VITE_CTP_API_URL

  if (host === undefined) {
    throw new Error('VITE_CTP_API_URL is not defined')
  }

  return {
    host,
    fetch: requestProvider,
  }
}
