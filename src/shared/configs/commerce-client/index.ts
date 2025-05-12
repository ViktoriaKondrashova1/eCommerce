import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'
import type { AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import {

  ClientBuilder,
} from '@commercetools/sdk-client-v2'
import { getAuthMiddlewareOptions } from './auth-middleware'
import { getHttpMiddlewareOptions } from './http-middleware'

// в commerceApiClient храним созданный апи, чтоьбы не создавать его заново при каждом вызове
let commerceApiClient: ByProjectKeyRequestBuilder | null = null

function getCommerceClient(): ByProjectKeyRequestBuilder {
  // проверяем существует ли commerceApiClient, если да, то возвращем его
  if (commerceApiClient) {
    return commerceApiClient
  }
  // получаем из commercetools sdk пармаетры для авторизации и http запросов
  const authMiddlewareOptions: AuthMiddlewareOptions = getAuthMiddlewareOptions()
  const httpMiddlewareOptions: HttpMiddlewareOptions = getHttpMiddlewareOptions()

  // билдер по созданию клиента коммерстулза с нужными мидлвэйрами (автор-ция, http и логирование)
  const ctpClientWithLogger = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build()

  // билдер по созданию клиента коммерстулза с нужными мидлвэйрами без логирования
  const ctpClientWithoutLogger = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build()

  const ctpClient = import.meta.env.MODE === 'development' ? ctpClientWithLogger : ctpClientWithoutLogger

  // создаем апи-клиента, привязывапя его к ключу из енва VITE_CTP_KEY
  commerceApiClient = createApiBuilderFromCtpClient(ctpClient)
    .withProjectKey({ projectKey: import.meta.env.VITE_CTP_KEY ?? '' })

  return commerceApiClient
}

export const commerceApi = getCommerceClient()
