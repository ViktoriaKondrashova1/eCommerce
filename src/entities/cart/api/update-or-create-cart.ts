import type { updateCartProps } from '../model/cart.types'
import { isNonNullable } from '@/shared/types/is-non-nullable'
import { cartStore } from '../model/cart.store'
import { createCart } from './create-cart'
import { updateCart } from './update-cart'

export async function updateOrCreateCart({ action, productId, lineItemId, quantity }: updateCartProps): Promise<void> {
  const cart = cartStore.getCart()

  if (isNonNullable(cart)) {
    await updateCart({ action, productId, lineItemId, quantity })
  }
  else {
    await createCart()
      .then(async () =>
        updateCart({ action, productId, lineItemId, quantity }),
      )
  }
}
