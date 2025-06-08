import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Empty } from 'antd'
import './AppEmpty.scss'

interface Props extends BaseComponent {
  children?: React.ReactNode
}

export const AppEmpty: FC<Props> = ({ testId = 'empty', children }) => {
  return (
    <Empty
      data-testid={testId}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      className="empty"
      description={
        <span className="empty-description">No beers</span>
      }
    >
      {children}
    </Empty>
  )
}
