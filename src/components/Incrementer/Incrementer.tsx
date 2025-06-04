import type { FC } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useState } from 'react'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'

export const Incrementer: FC = () => {
  const [quantity, setQuantity] = useState(1)

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
      <AppText>{quantity}</AppText>
      <AppButton
        shape="circle"
        icon={<PlusOutlined />}
        onClick={increaseQuantity}
      />
    </Flex>
  )
}
