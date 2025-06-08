import type { Cart } from '@commercetools/platform-sdk'
import { makeAutoObservable } from 'mobx'
import { CART_STORAGE_KEY } from '@/shared/constants'
import { local } from '@/shared/lib/storage'
import { isNonNullable } from '@/shared/types/is-non-nullable'
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
  cart: Cart | null = null
  public doesCartExist: boolean = false

  constructor() {
    makeAutoObservable(this)
    this.loadCart()
  }

  setCart(cart: Cart): void {
    this.cart = cart
    local.set(CART_STORAGE_KEY, cart)
    this.doesCartExist = true
  }

  getCart(): Cart | null {
    return this.cart
  }

  getCartId(): string | null {
    return this.cart?.id ?? null
  }

  getCartVersion(): number | null {
    return this.cart?.version ?? null
  }

  updateCart(cart: Partial<Cart>): void {
    if (!this.cart)
      return
    this.cart = { ...this.cart, ...cart }
    local.set(CART_STORAGE_KEY, this.cart)
  }

  clearCart(): void {
    this.cart = null
    this.doesCartExist = false
    local.remove(CART_STORAGE_KEY)
  }

  private loadCart(): void {
    const savedCart = local.get(CART_STORAGE_KEY)

    if (isNonNullable(savedCart) && isCart(savedCart)) {
      this.cart = savedCart
      this.doesCartExist = true
    }
    else {
      this.doesCartExist = false
      if (isNonNullable(savedCart))
        local.remove(CART_STORAGE_KEY)
    }
  }
}

export const cartStore = new CartStore()
