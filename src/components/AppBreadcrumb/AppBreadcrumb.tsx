import type { BreadcrumbProps } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'

interface Props extends BreadcrumbProps, BaseComponent {
  items?: ItemType[]
}

const breadcrumbItems = [
  { href: '/', title:
    (
      <>
        <HomeOutlined />
        <span>Home</span>
      </>
    ) },
  { title: 'Catalog' },
]

export const AppBreadcrumb: FC<Props> = ({ testId = 'breadcrumb', items }) => {
  return (
    <Breadcrumb data-testid={testId} items={items || breadcrumbItems} style={{ display: 'flex', alignItems: 'center' }} />
  )
}
