import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'
import { makeAutoObservable } from 'mobx'

class ProductStore {
  products: ProductProjectionPagedQueryResponse['results'] | []
  constructor() {
    this.products = []

    makeAutoObservable(this)
  }

  setProducts(products: ProductProjectionPagedQueryResponse['results']) {
    this.products = [...products]
  }
}

export const productStore = new ProductStore()
