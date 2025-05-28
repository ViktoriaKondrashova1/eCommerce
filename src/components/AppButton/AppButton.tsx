import type { ButtonProps } from 'antd'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Button } from 'antd'

interface Props extends ButtonProps, BaseComponent {}

export const AppButton: FC<Props> = ({ children, testId = 'button', ...rest }) => {
  return <Button data-testid={testId} {...rest}>{children}</Button>
}
