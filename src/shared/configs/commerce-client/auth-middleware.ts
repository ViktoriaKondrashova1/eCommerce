import type { AuthMiddlewareOptions, PasswordAuthMiddlewareOptions, TokenStore } from '@commercetools/sdk-client-v2'
import { TOKEN_STORAGE_KEY } from '@/shared/constants'
import { local } from '@/shared/lib/storage'
import { createAuthMiddleWareOptions } from './factory'

const options = createAuthMiddleWareOptions(import.meta.env.VITE_CTP_API_PROVIDER ?? 'ADMIN')

export const getAuthMiddlewareOptions = (): AuthMiddlewareOptions => options

export function getPasswordAuthMiddlewareOptions(
  credentials: { username: string, password: string },
): PasswordAuthMiddlewareOptions {
  return {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey: import.meta.env.VITE_CTP_KEY,
    credentials: {
      clientId: import.meta.env.VITE_CTP_FRONTEND_CLIENT_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_FRONTEND_CLIENT_SECRET,
      user: {
        username: credentials.username,
        password: credentials.password,
      },
    },
    scopes: import.meta.env.VITE_CTP_FRONTEND_CLIENT_SCOPES.split(' '),
    tokenCache: {
      get: (): TokenStore => {
        const cache = local.get<TokenStore>(TOKEN_STORAGE_KEY)
        return cache || { token: '', expirationTime: 0 }
      },
      set: (cache: TokenStore): void => {
        local.set(TOKEN_STORAGE_KEY, cache)
      },

    },
  }
}
