import type { BaseComponent } from '@/shared/types/common.types'
import type { InputProps } from 'antd'
import type { FC } from 'react'
import { Input } from 'antd'

interface Props extends InputProps, BaseComponent {}

export const AppInput: FC<Props> = ({ testId = 'input', ...rest }) => {
  return <Input data-testid={testId} {...rest} />
}
