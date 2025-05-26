import type { InputProps } from 'antd'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Input } from 'antd'

interface PasswordProps {
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}

interface Props extends InputProps, BaseComponent {
  isPassword?: boolean
  visibilityToggle?: boolean | PasswordProps
}

export const AppInput: FC<Props> = ({ testId = 'input', isPassword = false, visibilityToggle = true, ...rest }) => {
  return isPassword
    ? (
        <Input.Password
          data-testid={testId}
          visibilityToggle={visibilityToggle}
          {...rest}
        />
      )
    : (
        <Input
          data-testid={testId}
          {...rest}
        />
      )
}
