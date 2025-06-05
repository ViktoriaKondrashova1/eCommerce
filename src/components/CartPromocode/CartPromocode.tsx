import type { FC } from 'react'
import { Flex } from 'antd'
import { AppButton } from '../AppButton'
import { AppInput } from '../AppInput/AppInput'
import { AppTitle } from '../AppTitle/AppTitle'

export const CartPromocode: FC = () => {
  return (
    <Flex vertical style={{ width: 300, marginTop: 20 }}>
      <AppTitle level={4}>Promo Code</AppTitle>
      <Flex gap="small">
        <AppInput />
        <AppButton type="primary">Apply</AppButton>
      </Flex>
    </Flex>
  )
}
