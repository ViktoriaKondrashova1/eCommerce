import type { BreadcrumbProps } from 'antd'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Breadcrumb } from 'antd'
import { useBreadcrumb } from './use-breadcrumb'

export interface CustomBreadcrumbItem {
  key: string
  title: React.ReactNode
  href?: string
}

interface Props extends BreadcrumbProps, BaseComponent {
  items?: CustomBreadcrumbItem[]
}

export const AppBreadcrumb: FC<Props> = ({ testId = 'breadcrumb', items }) => {
  const { breadcrumbItems } = useBreadcrumb()

  return (
    <Breadcrumb data-testid={testId} items={items || breadcrumbItems} style={{ display: 'flex', alignItems: 'center' }} />
  )
}
