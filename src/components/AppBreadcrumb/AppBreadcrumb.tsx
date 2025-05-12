import type { BaseComponent } from '@/shared/types/common.types'
import type { BreadcrumbProps } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import type { FC } from 'react'
import { Breadcrumb } from 'antd'

interface props extends BreadcrumbProps, BaseComponent {
  items: ItemType[]
}

export const AppBreadcrumb: FC<props> = ({ testId = 'breadcrumb', items }) => {
  return (
    <Breadcrumb data-testid={testId} items={items} />
  )
}
