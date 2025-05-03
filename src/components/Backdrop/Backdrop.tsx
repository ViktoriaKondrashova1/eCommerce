import type { BaseComponent } from '@/shared/types/common.types'
import type { FC, ReactNode } from 'react'

import './Backdrop.scss'

interface Props extends BaseComponent {
  children: ReactNode
  className?: string
}

export const Backdrop: FC<Props> = ({ testId = 'backdrop', className = 'backdrop', children }) => {
  return (
    <div data-testid={testId} className={className}>
      {children}
    </div>
  )
}
