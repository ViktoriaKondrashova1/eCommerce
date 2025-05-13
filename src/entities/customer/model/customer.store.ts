import type { CustomerSignInResult } from '@commercetools/platform-sdk'
import { storage } from '@/shared/lib/storage'
import { makeAutoObservable } from 'mobx'

/**
 * стор юзера:
 * 1. храним данные юзера
 * 2. статус авторизации (isAuth)
 * 3. loadCustomer - загружаем сохраненные данные юзера
 * 4. setIsAuth - устанавливаем статус авторизации
 * 5. setCustomer - сохраняем данные юзера
 * 6. logout - очищаем данные при логауте, вычищаем локал сторадж
 */
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
  }

  private loadCustomer(): void {
    const savedCustomer = storage.get<CustomerSignInResult>('customer')
    if (savedCustomer instanceof Object && Object.keys(savedCustomer).length > 0) {
      this.customer = savedCustomer
      this.isAuth = true
    }
  }
}

export const customerStore = new CustomerStore()
