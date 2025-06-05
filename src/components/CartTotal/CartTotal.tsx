import type { FC } from 'react'
import { Flex } from 'antd'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'

interface Props {
  quantity: number
  total: number
}

export const CartTotal: FC<Props> = ({ quantity, total }) => {
  return (
    <Flex vertical align="end" style={{ margin: '40px 0 100px 0' }}>
      <Flex justify="space-between" style={{ width: 250 }}>
        <AppTitle level={5}>Item(s):</AppTitle>
        <AppText>{quantity}</AppText>
      </Flex>
      <Flex justify="space-between" style={{ width: 250 }}>
        <AppTitle level={5}>Total:</AppTitle>
        <AppText>
          $
          {total}
        </AppText>
      </Flex>
      <AppButton type="primary" style={{ width: 250, marginTop: 20 }}>Checkout</AppButton>
    </Flex>
  )
}
