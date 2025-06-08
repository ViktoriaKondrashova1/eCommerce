import type { Cart } from '@commercetools/platform-sdk'
import { makeAutoObservable } from 'mobx'
import { isCart } from './cart.types'

/**
 * стор корзины:
 * 1. храним корзину, по дефолту null
 * 2. используем makeAutoObservable для обновления корзины
 * 3. setCart - устанавливаем данные корзины
 * 4. getCartId - возвращаем айди корзины, если она есть, а иначе null
 * 5. getCartVersion - возвращаем версию корзины, если она есть, а иначе null
 * 6. updateCart - обновляем данные, объединяя старую корзину с новыми изменениями
 */

class CartStore {
  cart: Cart | null

  constructor() {
    this.cart = null

    makeAutoObservable(this)
  }

  setCart(cart: Cart): void {
    this.cart = cart
  }

  getCart(): Cart | null {
    if (!this.cart)
      return null
    try {
      const parsedCart = JSON.parse(JSON.stringify(this.cart))
      if (isCart(parsedCart)) {
        return parsedCart
      }
      console.error('Invalid cart structure:', parsedCart)
      return null
    }
    catch (error) {
      console.error('Error parsing cart:', error)
      return null
    }
  }

  getCartId(): string | null {
    if (!this.cart) {
      return null
    }
    return this.cart.id
  }

  getCartVersion(): number | null {
    if (!this.cart) {
      return null
    }
    return this.cart.version
  }

  updateCart(cart: Partial<Cart>): void {
    if (!this.cart) {
      return
    }
    this.cart = { ...this.cart, ...cart }
  }

  clearCart(): void {
    this.cart = null
  }
}

export const cartStore = new CartStore()
