import type { LineItem } from '@commercetools/platform-sdk'
import type { CartDataType } from '@/entities/cart/model/cart.types'
import { CartTableProduct } from '@/components/CartTableProduct/CartTableProduct'
import { Incrementer } from '@/components/Incrementer/Incrementer'

export function adaptCartData(items: LineItem[]): CartDataType[] {
  return items.map((item) => {
    const price = item.price.discounted ? item.price.discounted.value.centAmount : item.price.value.centAmount

    return ({
      key: item.id,
      product: <CartTableProduct productId={item.productId} />,
      price: `$${(price / 100).toFixed(2)}`,
      quantity: <Incrementer quantity={item.quantity} lineItemId={item.id} productId={item.productId} />,
      subtotal: `$${((price * item.quantity) / 100).toFixed(2)}`,
    })
  },
  )
}
