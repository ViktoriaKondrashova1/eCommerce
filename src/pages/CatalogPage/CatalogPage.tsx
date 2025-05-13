import type { FC } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { CatalogSidebar } from '@/components/CatalogSidebar/CatalogSidebar'
import { ProductList } from '@/components/ProductList/ProductList'
import { mockProducts } from '@/shared/constants'
import { HomeOutlined } from '@ant-design/icons'
import { Flex } from 'antd'

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
    <>
      <AppBreadcrumb items={breadcrumbItems} />
      <Flex gap="small" style={{ marginTop: 40 }}>
        <CatalogSidebar />
        <ProductList products={mockProducts} />
      </Flex>

    </>
  )
}
