import { makeAutoObservable } from 'mobx'

class ProductStore {
  products: unknown[]
  constructor() {
    this.products = []

    makeAutoObservable(this)
  }

  setProducts(products: unknown[]) {
    this.products = [...products]
  }

  updateProducts(products: unknown[]) {
    this.products = [this.products, ...products]
  }
}

export const productStore = new ProductStore()
