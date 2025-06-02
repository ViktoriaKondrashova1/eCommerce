import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useState } from 'react'
import { AppButton } from '@/components/AppButton/AppButton'

interface Props extends BaseComponent {}

export const AddToCartButton: FC<Props> = ({ testId = 'add-to-cart' }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setIsChecked(true)
    setTimeout(() => setIsChecked(false), 1000)
  }

  return (
    <Tooltip data-testid={testId} title="Add to Cart">
      <AppButton
        type="primary"
        shape="circle"
        icon={isChecked ? <CheckOutlined /> : <PlusOutlined />}
        onClick={handleAddToCart}
      />
    </Tooltip>
  )
}
