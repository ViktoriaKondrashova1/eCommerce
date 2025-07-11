import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { Flex } from 'antd'
import { AppButton } from '../../../components/AppButton'
import { AppText } from '../../../components/AppText/AppText.tsx'
import { AppTitle } from '../../../components/AppTitle/AppTitle.tsx'
import './CartTotal.scss'

export interface Props extends BaseComponent {
  quantity: number
  total: number
  withDiscount: number
}

export const CartTotal: FC<Props> = ({ testId = 'cart-total', quantity, total, withDiscount }) => {
  return (
    <Flex data-testid={testId} className="cart-total" vertical align="end" style={{ margin: '40px 0 100px 0' }}>
      <Flex className="cart-total-row">
        <AppTitle level={5}>Item(s):</AppTitle>
        <AppText>{quantity}</AppText>
      </Flex>
      <Flex className="cart-total-row">
        <AppTitle level={5}>Total:</AppTitle>
        {
          withDiscount > 0
            ? (
                <Flex gap="small">
                  <AppText style={{ textDecoration: 'line-through' }}>
                    $
                    {(total + withDiscount).toFixed(2)}
                  </AppText>
                  <AppText style={{ color: '#E84B1A' }}>
                    $
                    {total.toFixed(2)}
                  </AppText>
                </Flex>
              )
            : (
                <AppText>
                  $
                  {total.toFixed(2)}
                </AppText>
              )
        }
      </Flex>
      <AppButton className="button-checkout" type="primary">Checkout</AppButton>
    </Flex>
  )
}
