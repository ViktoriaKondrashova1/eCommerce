import type { Cart } from '@commercetools/platform-sdk'

export interface CartDataType {
  key: React.Key
  product: React.ReactElement<{
    productId: string
  }>
  price: string
  quantity: React.ReactElement<{
    productId: string
    lineItemId: string
    quantity: number
  }>
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

type ActionType = 'addLineItem' | 'removeLineItem' | 'changeLineItemQuantity'

export interface updateCartProps {
  action: ActionType
  productId: string
  lineItemId?: string
  quantity: number
}
