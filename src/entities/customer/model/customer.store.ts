import type { CustomerSignInResult } from '@commercetools/platform-sdk'
import type { TokenStore } from '@commercetools/sdk-client-v2'
import { makeAutoObservable } from 'mobx'
import { setCommerceApiFlow } from '@/shared/configs/commerce-client'
import { TOKEN_STORAGE_KEY } from '@/shared/constants'
import { storage } from '@/shared/lib/storage'

class CustomerStore {
  public customer: CustomerSignInResult['customer'] | null
  public isAuth: boolean

  constructor() {
    makeAutoObservable(this)
    this.customer = null
    this.isAuth = false

    this.loadCustomer()
  }

  public setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  public setCustomer(customer: CustomerSignInResult['customer']) {
    this.customer = customer
  }

  logout(): void {
    this.customer = null
    this.isAuth = false
    storage.remove(TOKEN_STORAGE_KEY)
    setCommerceApiFlow({ flow: 'anonymous' })
  }

  private loadCustomer(): void {
    const tokenCache = storage.get<TokenStore>(TOKEN_STORAGE_KEY)
    if (tokenCache instanceof Object && Object.keys(tokenCache).length > 0) {
      this.isAuth = true
    }
  }
}

export const customerStore = new CustomerStore()
