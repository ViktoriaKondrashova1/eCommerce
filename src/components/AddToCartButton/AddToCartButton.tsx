import type { FC } from 'react'
import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useState } from 'react'
import { AppButton } from '@/components/AppButton/AppButton'

const AddToCartButton: FC = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setIsChecked(true)
    setTimeout(() => setIsChecked(false), 1000)
  }

  return (
    <Tooltip title="Add to Cart">
      <AppButton
        type="primary"
        shape="circle"
        icon={isChecked ? <CheckOutlined /> : <PlusOutlined />}
        onClick={handleAddToCart}
      />
    </Tooltip>
  )
}

export default AddToCartButton
