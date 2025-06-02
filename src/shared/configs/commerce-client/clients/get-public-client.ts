import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'
import type { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { ClientBuilder } from '@commercetools/sdk-client-v2'
import { getAuthMiddlewareOptions } from '@/shared/configs/commerce-client/auth-middleware'
import { getHttpMiddlewareOptions } from '@/shared/configs/commerce-client/http-middleware'

let commerceApiClient: ByProjectKeyRequestBuilder | null = null

export function getCommerceClientPublic(
): ByProjectKeyRequestBuilder {
  commerceApiClient = null

  const authMiddlewareOptions = getAuthMiddlewareOptions()
  const httpMiddlewareOptions: HttpMiddlewareOptions = getHttpMiddlewareOptions()

  const clientBuilder = new ClientBuilder()
    .withAnonymousSessionFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)

  if (import.meta.env.MODE === 'development') {
    clientBuilder.withLoggerMiddleware()
  }

  const client = clientBuilder.build()

  commerceApiClient = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey: import.meta.env.VITE_CTP_KEY ?? '' })

  return commerceApiClient
}
