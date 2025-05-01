import type { CustomerSignInResult } from '@commercetools/platform-sdk'
import { storage } from '@/shared/lib/storage'
import { makeAutoObservable } from 'mobx'

class CustomerStore {
  public customer: CustomerSignInResult | null
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

  public setCustomer(customer: CustomerSignInResult) {
    this.customer = customer
  }

  logout(): void {
    this.customer = null
    this.isAuth = false
    storage.remove('customer')
    storage.remove('auth_token')
  }

  private loadCustomer(): void {
    const savedCustomer = storage.get<CustomerSignInResult>('customer')
    if (savedCustomer) {
      this.customer = savedCustomer
      this.isAuth = true
    }
  }
}

export const customerStore = new CustomerStore()
