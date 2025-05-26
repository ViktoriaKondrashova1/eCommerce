import type { FC, ReactNode } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'

import './Backdrop.scss'

interface Props extends BaseComponent {
  children: ReactNode
  className?: string

}

export const Backdrop: FC<Props> = ({ testId = 'backdrop', className = 'backdrop', children, ...rest }) => {
  return (
    <div data-testid={testId} className={className} {...rest}>
      {children}
    </div>
  )
}
