import type { BreadcrumbProps } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Breadcrumb } from 'antd'
import { useBreadcrumb } from './use-breadcrumb'

interface Props extends BreadcrumbProps, BaseComponent {
  items?: ItemType[]
}

export const AppBreadcrumb: FC<Props> = ({ testId = 'breadcrumb', items }) => {
  const { breadcrumbItems } = useBreadcrumb()

  return (
    <Breadcrumb data-testid={testId} items={items || breadcrumbItems} style={{ display: 'flex', alignItems: 'center' }} />
  )
}
