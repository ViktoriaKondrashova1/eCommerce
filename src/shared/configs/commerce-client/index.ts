import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'
import type { AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import {

  ClientBuilder,
} from '@commercetools/sdk-client-v2'
import { getAuthMiddlewareOptions } from './auth-middleware'
import { getHttpMiddlewareOptions } from './http-middleware'

let commerceApiClient: ByProjectKeyRequestBuilder | null = null

function getCommerceClient(): ByProjectKeyRequestBuilder {
  if (commerceApiClient) {
    return commerceApiClient
  }

  const authMiddlewareOptions: AuthMiddlewareOptions = getAuthMiddlewareOptions()
  const httpMiddlewareOptions: HttpMiddlewareOptions = getHttpMiddlewareOptions()

  const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build()

  commerceApiClient = createApiBuilderFromCtpClient(ctpClient)
    .withProjectKey({ projectKey: import.meta.env.VITE_CTP_KEY ?? '' })

  return commerceApiClient
}

export const commerceApi = getCommerceClient()
