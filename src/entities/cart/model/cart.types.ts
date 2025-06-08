import type { Cart } from '@commercetools/platform-sdk'

export interface CartDataType {
  key: React.Key
  product: React.ReactNode
  price: string
  quantity: React.ReactNode
  subtotal: string
}

export function isCart(cart: unknown): cart is Cart {
  return (
    cart !== null
    && cart !== undefined
    && typeof cart === 'object'
    && 'id' in cart
    && 'lineItems' in cart
  )
};
