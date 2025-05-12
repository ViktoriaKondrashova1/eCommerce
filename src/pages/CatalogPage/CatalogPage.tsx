import type { FC } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { HomeOutlined } from '@ant-design/icons'

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

export const CatalogPage: FC = () => {
  return (
    <AppBreadcrumb items={breadcrumbItems} />
  )
}
