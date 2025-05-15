import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { Skeleton } from 'antd'
import { Backdrop } from '../Backdrop/Backdrop'

interface Props extends BaseComponent {}

export const AppSkeleton: FC<Props> = ({ testId = 'skeleton' }) => {
  return (
    <Backdrop data-testid={testId} style={{ padding: '16px 0', width: '100%' }}>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </Backdrop>
  )
}
