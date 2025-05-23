import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'
import type { TokenStore } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { ClientBuilder } from '@commercetools/sdk-client-v2'
import { getHttpMiddlewareOptions } from '@/shared/configs/commerce-client/http-middleware'

export function getExistingSessionClient(tokenCache: TokenStore): ByProjectKeyRequestBuilder {
  const clientBuilder = new ClientBuilder()
    .withExistingTokenFlow(`Bearer ${tokenCache.token}`, { force: true })
    .withHttpMiddleware(getHttpMiddlewareOptions())

  if (import.meta.env.MODE === 'development') {
    clientBuilder.withLoggerMiddleware()
  }
  const client = clientBuilder.build()

  const fromSessionClient = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey: import.meta.env.VITE_CTP_KEY })

  return fromSessionClient
}
