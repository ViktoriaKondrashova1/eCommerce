import type { CSSProperties, FC, ReactNode } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'

import './Backdrop.scss'

interface Props extends BaseComponent {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export const Backdrop: FC<Props> = ({ testId = 'backdrop', className = 'backdrop', children, style, ...rest }) => {
  return (
    <div {...rest} data-testid={testId} className={className} style={style}>
      {children}
    </div>
  )
}
