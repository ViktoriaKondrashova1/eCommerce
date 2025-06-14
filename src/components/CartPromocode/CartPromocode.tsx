import type { FC } from 'react'
import { Flex } from 'antd'
import { useState } from 'react'
import { applyPromoCode } from '@/entities/cart/api/apply-promo-code'
import { cartStore } from '@/entities/cart/model/cart.store'
import { AppButton } from '../AppButton'
import { AppInput } from '../AppInput/AppInput'
import { AppTitle } from '../AppTitle/AppTitle'
import { getDiscountCodes } from './get-cart-discount'

export const CartPromocode: FC = () => {
  const [promoCode, setPromoCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const cart = cartStore.getCart()

  const handleApply = async () => {
    const discountCodes = await getDiscountCodes()

    if (!cart?.lineItems && cart?.lineItems.length === 0) {
      setError('The cart is empty')
      return
    }

    if (!promoCode.trim()) {
      setError('Please enter a promo code')
      return
    }

    if (cart?.discountCodes !== undefined && cart.discountCodes.length > 0) {
      const discountCodeIds = new Set(
        discountCodes.body.results.map(item => item.id),
      )

      const index = discountCodes.body.results.findIndex(item =>
        discountCodeIds.has(item.id)
        && cart?.discountCodes?.some(cartItem => cartItem.discountCode.id === item.id),
      )

      if (discountCodes.body.results[index].code === promoCode.trim()) {
        setError('The promo code has been already applied')
        return
      }
    }

    setIsLoading(true)
    setError('')

    try {
      await applyPromoCode(promoCode.trim())
      setPromoCode('')
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply promo code')
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex vertical style={{ width: 300, marginTop: 20 }}>
      <AppTitle level={4}>Promo Code</AppTitle>
      <Flex gap="small">
        <AppInput
          value={promoCode}
          onChange={e => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
          status={error ? 'error' : ''}
        />
        <AppButton
          type="primary"
          onClick={() => void handleApply()}
          loading={isLoading}
          disabled={!promoCode.trim()}
        >
          Apply
        </AppButton>
      </Flex>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </Flex>
  )
}
