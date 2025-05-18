import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { Empty } from 'antd'

interface Props extends BaseComponent {}

export const AppEmpty: FC<Props> = ({ testId = 'empty' }) => {
  return (
    <Empty data-testid={testId} image={Empty.PRESENTED_IMAGE_SIMPLE} />
  )
}
