import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Typography } from 'antd'

const { Text } = Typography

type TextProps = React.ComponentProps<typeof Text>

interface Props extends TextProps, BaseComponent {}

export const AppText: FC<Props> = ({ children, testId = 'text', ...rest }) => {
  return <Text data-testid={testId} {...rest}>{children}</Text>
}
