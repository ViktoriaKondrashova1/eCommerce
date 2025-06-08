import type { FC } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useState } from 'react'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'

interface Props {
  quantity?: number
}

export const Incrementer: FC<Props> = ({ quantity = 1 }) => {
  const [newQuantity, setQuantity] = useState<number>(quantity)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <Flex gap="small" align="center">
      <AppButton
        shape="circle"
        icon={<MinusOutlined />}
        onClick={decreaseQuantity}
        disabled={quantity <= 1}
      />
      <AppText>{newQuantity}</AppText>
      <AppButton
        shape="circle"
        icon={<PlusOutlined />}
        onClick={increaseQuantity}
      />
    </Flex>
  )
}
