import type { TokenStore } from '@commercetools/sdk-client-v2'
import { useEffect, useState } from 'react'
import { fetchMe } from '@/entities/customer/api/fetch-me'
import { customerStore } from '@/entities/customer/model/customer.store'
import { setCommerceApiFlow } from '@/shared/configs/commerce-client'
import { TOKEN_STORAGE_KEY } from '@/shared/constants'
import { storage } from '@/shared/lib/storage'

async function setInitialFlow(): Promise<boolean> {
  return new Promise((resolve) => {
    const tokenCache = storage.get<TokenStore>(TOKEN_STORAGE_KEY)
    const isToken = Boolean(tokenCache?.token)
    if (tokenCache !== null && isToken) {
      setCommerceApiFlow<TokenStore>({ flow: 'token', payload: tokenCache })
    }
    else {
      setCommerceApiFlow({ flow: 'anonymous' })
    }

    resolve(true)
  })
}

async function getMe(): Promise<boolean> {
  return new Promise((resolve) => {
    const tokenCache = storage.get<TokenStore>(TOKEN_STORAGE_KEY)
    const isToken = Boolean(tokenCache?.token)

    if (isToken) {
      void fetchMe().then((res) => {
        if (res.statusCode === 200) {
          customerStore.setCustomer(res.body)
          resolve(true)
        }
      })
    }

    resolve(true)
  })
}
export function useInitApp() {
  const [isPageInit, setIsPageInit] = useState<boolean>(false)

  useEffect(() => {
    void setInitialFlow()
      .then(async () => {
        return getMe()
      })
      .finally(() => {
        setIsPageInit(true)
      })
  }, [])

  return isPageInit
}
