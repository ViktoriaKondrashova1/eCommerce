import type { Product } from '@commercetools/platform-sdk'
import { makeAutoObservable } from 'mobx'

class ProductStore {
  products: Product[] | []
  constructor() {
    this.products = []

    makeAutoObservable(this)
  }

  setProducts(products: Product[]) {
    this.products = [...products]
  }
}

export const productStore = new ProductStore()
