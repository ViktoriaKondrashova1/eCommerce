import type { FC } from 'react'
import { Flex } from 'antd'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'

interface Props {
  quantity: number
  total: number
  withDiscount: number
}

export const CartTotal: FC<Props> = ({ quantity, total, withDiscount }) => {
  return (
    <Flex vertical align="end" style={{ margin: '40px 0 100px 0' }}>
      <Flex justify="space-between" style={{ width: 250 }}>
        <AppTitle level={5}>Item(s):</AppTitle>
        <AppText>{quantity}</AppText>
      </Flex>
      <Flex justify="space-between" style={{ width: 250 }}>
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
      <AppButton type="primary" style={{ width: 250, marginTop: 20 }}>Checkout</AppButton>
    </Flex>
  )
}
