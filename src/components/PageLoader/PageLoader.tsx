import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect } from 'react'
import { lockScroll } from '@/shared/lib/lock-scroll'
import './PageLoader.scss'

export function PageLoader() {
  useEffect(() => {
    lockScroll({ isLocked: true })

    return () => {
      lockScroll({ isLocked: false })
    }
  }, [])

  return (
    <div className="page-loader-container">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
    </div>
  )
}
