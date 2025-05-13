import type { FC } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { CatalogPagination } from '@/components/CatalogPagination/CatalogPagination'
import { CatalogSearch } from '@/components/CatalogSearch/CatalogSearch'
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
      <Flex justify="space-between">
        <AppBreadcrumb items={breadcrumbItems} />
        <CatalogSearch />
      </Flex>
      <Flex gap="large" style={{ marginTop: 40 }}>
        <CatalogSidebar />
        <Flex vertical gap="large">
          <ProductList products={mockProducts} />
          <CatalogPagination />
        </Flex>
      </Flex>
    </>
  )
}
