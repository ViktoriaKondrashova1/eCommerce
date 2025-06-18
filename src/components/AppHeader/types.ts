import type { ButtonProps } from 'antd'
import type { ReactNode } from 'react'

export interface MenuItem {
  key: string
  label?: string
  icon?: ReactNode
  color?: ButtonProps['color']
}
