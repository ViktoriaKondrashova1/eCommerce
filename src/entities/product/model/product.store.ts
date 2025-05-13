import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'
import { makeAutoObservable } from 'mobx'

/**
 * стор продуктов:
 * 1. products - список продуктов, по дефолту пустой массив
 * 2. makeAutoObservable - отслеживаем изменения products и обновляем состояние
 * 3. setProducts - получаем новый список продуктов и заменяем на старый
 */
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
