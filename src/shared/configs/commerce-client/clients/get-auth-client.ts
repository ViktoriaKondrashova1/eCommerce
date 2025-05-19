import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { ClientBuilder } from '@commercetools/sdk-client-v2'
import { getPasswordAuthMiddlewareOptions } from '@/shared/configs/commerce-client/auth-middleware'
import { getHttpMiddlewareOptions } from '@/shared/configs/commerce-client/http-middleware'

let authClient: ByProjectKeyRequestBuilder | null = null

export function getCommerceClientWithPassword(
  credentials: { username: string, password: string },
): ByProjectKeyRequestBuilder {
  try {
    const authMiddlewareOptions = getPasswordAuthMiddlewareOptions(credentials)
    const httpMiddlewareOptions = getHttpMiddlewareOptions()

    const clientBuilder = new ClientBuilder()
      .withPasswordFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)

    if (import.meta.env.MODE === 'development') {
      clientBuilder.withLoggerMiddleware()
    }

    const client = clientBuilder.build()

    authClient = createApiBuilderFromCtpClient(client)
      .withProjectKey({ projectKey: import.meta.env.VITE_CTP_KEY ?? '' })

    return authClient
  }
  catch {
    throw new Error('Не удалось установить password flow')
  }
}
