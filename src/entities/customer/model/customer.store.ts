import type { CustomerSignInResult } from '@commercetools/platform-sdk'
import type { TokenStore } from '@commercetools/sdk-client-v2'
import { makeAutoObservable } from 'mobx'
import { cartStore } from '@/entities/cart/model/cart.store.ts'
import { setCommerceApiFlow } from '@/shared/configs/commerce-client'
import { TOKEN_STORAGE_KEY } from '@/shared/constants'
import { local } from '@/shared/lib/storage'

type Customer = CustomerSignInResult['customer']

class CustomerStore {
  public customer: Customer | null
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

  public setCustomer(customer: Customer) {
    this.customer = customer
  }

  logout(): void {
    this.customer = null
    this.isAuth = false
    local.remove(TOKEN_STORAGE_KEY)
    setCommerceApiFlow({ flow: 'anonymous' })
    cartStore.clearCart()
  }

  private loadCustomer(): void {
    const tokenCache = local.get<TokenStore>(TOKEN_STORAGE_KEY)
    if (tokenCache instanceof Object && Object.keys(tokenCache).length > 0) {
      this.isAuth = true
    }
  }
}

export const customerStore = new CustomerStore()
