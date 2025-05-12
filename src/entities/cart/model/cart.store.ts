import type { Cart } from '@commercetools/platform-sdk'
import { makeAutoObservable } from 'mobx'

/**
 * стор корзины:
 * 1. храним корзину, по дефолту null
 * 2. используем makeAutoObservable для обновления корзины
 * 3. setCart - устанавливаем данные корзины
 * 4. getCartId - возвращаем айди корзины, если она есть, а иначе null
 * 5. updateCart - обновляем данные, объединяя старую корзину с новыми изменениями
 */
class CartStore {
  cart: Cart | null
  constructor() {
    this.cart = null

    makeAutoObservable(this)
  }

  setCart(cart: Cart) {
    this.cart = cart
  }

  getCartId() {
    if (!this.cart) {
      return null
    }
    return this.cart.id
  }

  updateCart(cart: Partial<Cart>) {
    if (!this.cart) {
      return
    }
    this.cart = { ...this.cart, ...cart }
  }
}

export const cartStore = new CartStore()
