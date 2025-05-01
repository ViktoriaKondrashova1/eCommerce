import type { AuthMiddlewareOptions } from '@commercetools/sdk-client-v2'
import type { ApiProvider } from './types'
import { requestProvider } from './request-provider'

function getEnvs(provider: ApiProvider): {
  host: string
  projectKey: string
  clientId: string
  clientSecret: string
  scopes: string[]
} {
  const host = import.meta.env.VITE_CTP_AUTH_URL
  const projectKey = import.meta.env.VITE_CTP_KEY
  const clientId = (() => {
    if (provider === 'ADMIN') {
      return import.meta.env.VITE_CTP_ADMIN_CLIENT_ID
    }
    if (provider === 'B2B') {
      return import.meta.env.VITE_CTP_B2B_CLIENT_ID
    }
    if (provider === 'B2C') {
      return import.meta.env.VITE_CTP_B2C_CLIENT_ID
    }
  })()

  const clientSecret = (() => {
    if (provider === 'ADMIN') {
      return import.meta.env.VITE_CTP_ADMIN_SECRET
    }
    if (provider === 'B2B') {
      return import.meta.env.VITE_CTP_B2B_SECRET
    }
    if (provider === 'B2C') {
      return import.meta.env.VITE_CTP_B2C_SECRET
    }
  })()

  const stringScopes = (() => {
    if (provider === 'ADMIN') {
      return import.meta.env.VITE_CTP_ADMIN_SCOPES
    }
    if (provider === 'B2B') {
      return import.meta.env.VITE_CTP_B2B_SCOPES
    }
    if (provider === 'B2C') {
      return import.meta.env.VITE_CTP_B2C_SCOPES
    }
  })()

  if (host === undefined) {
    throw new Error('VITE_CTP_AUTH_URL is not defined')
  }

  if (projectKey === undefined) {
    throw new Error('VITE_CTP_KEY is not defined')
  }

  if (clientId === undefined) {
    throw new Error('VITE_CTP_CLIENT_ID is not defined')
  }

  if (clientSecret === undefined) {
    throw new Error('VITE_CTP_CLIENT_SECRET is not defined')
  }

  if (stringScopes === undefined) {
    throw new Error('VITE_CTP_SCOPES is not defined')
  }

  const scopes = stringScopes.split(' ')

  return {
    host,
    projectKey,
    clientId,
    clientSecret,
    scopes,
  }
}
export function createAuthMiddleWareOptions(provider: ApiProvider): AuthMiddlewareOptions {
  const { host, projectKey, clientId, clientSecret, scopes } = getEnvs(provider)

  return {
    host,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes,
    fetch: requestProvider,
  }
}
