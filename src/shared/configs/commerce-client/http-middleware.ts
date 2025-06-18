import type { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'
import { requestProvider } from './request-provider'

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
