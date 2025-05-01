import type { Cart } from '@commercetools/platform-sdk'
import { makeAutoObservable } from 'mobx'

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
