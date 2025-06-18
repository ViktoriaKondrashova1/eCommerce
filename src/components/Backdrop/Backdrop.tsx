import type { CSSProperties, FC, ReactNode } from 'react'

import './Backdrop.scss'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export const Backdrop: FC<Props> = ({ className = 'backdrop', children, style, ...rest }) => {
  return (
    <div {...rest} className={className} style={style}>
      {children}
    </div>
  )
}
