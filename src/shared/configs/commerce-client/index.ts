/* eslint-disable no-console */
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'
import type { TokenStore } from '@commercetools/sdk-client-v2'
import { getCommerceClientWithPassword } from '@/shared/configs/commerce-client/clients/get-auth-client'
import { getCommerceClientPublic } from '@/shared/configs/commerce-client/clients/get-public-client'
import { getExistingSessionClient } from '@/shared/configs/commerce-client/clients/get-session-client'
import { isType } from '@/shared/types/is-type'

export const commerceApi: Record<'client', ByProjectKeyRequestBuilder> = {
  client: getCommerceClientPublic(),
}

export function setCommerceApiFlow<T extends Record<string, unknown>>({ flow, payload }: { flow: 'anonymous' | 'password' | 'token', payload?: T }): void {
  switch (flow) {
    case 'password': {
      if (payload !== undefined && isType<{ username: string, password: string }>(payload)) {
        commerceApi.client = getCommerceClientWithPassword(payload)
        if (import.meta.env.MODE === 'development') {
          console.log('сменили флоу на password')
        }
      }
      break
    }

    case 'token': {
      if (payload !== undefined && isType<TokenStore>(payload)) {
        commerceApi.client = getExistingSessionClient(payload)
        if (import.meta.env.MODE === 'development') {
          console.log('сменили флоу на token')
        }
      }
      break
    }

    case 'anonymous':
    default: {
      commerceApi.client = getCommerceClientPublic()
      if (import.meta.env.MODE === 'development') {
        console.log('сменили флоу на public')
      }

      break
    }
  }
}
