import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { Typography } from 'antd'

const { Text } = Typography

type TextProps = React.ComponentProps<typeof Text>

interface Props extends TextProps, BaseComponent {}

export const AppText: FC<Props> = ({ children, testId = 'text', ...rest }) => {
  return <Text data-testid={testId} {...rest}>{children}</Text>
}
