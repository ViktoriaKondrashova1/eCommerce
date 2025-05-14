import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { FC } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { CatalogPagination } from '@/components/CatalogPagination/CatalogPagination'
import { CatalogSearch } from '@/components/CatalogSearch/CatalogSearch'
import { CatalogSidebar } from '@/components/CatalogSidebar/CatalogSidebar'
import { ProductList } from '@/components/ProductList/ProductList'
import { fetchProducts } from '@/entities/product/api/fetch-products'
import { importProductAdapter, useCategories } from '@/shared/adapters/import/product.adapter'
import { HomeOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useEffect, useState } from 'react'

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
  const [products, setProducts] = useState<ICleanProduct[]>([])
  useCategories()

  useEffect(() => {
    fetchProducts()
      .then((response) => {
        const cleanData = importProductAdapter(response.body.results)
        setProducts(cleanData)
      })
      .catch(() => {
        throw new Error('clean data not found')
      },
      )
  }, [])

  return (
    <>
      <Flex justify="space-between">
        <AppBreadcrumb items={breadcrumbItems} />
        <CatalogSearch />
      </Flex>
      <Flex gap="large" style={{ marginTop: 40 }}>
        <CatalogSidebar />
        <Flex vertical gap="large">
          <ProductList products={products} />
          <CatalogPagination />
        </Flex>
      </Flex>
    </>
  )
}
