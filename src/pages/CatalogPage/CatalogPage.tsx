import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { FC } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { CatalogPagination } from '@/components/CatalogPagination/CatalogPagination'
import { CatalogSearch } from '@/components/CatalogSearch/CatalogSearch'
import { CatalogSidebar } from '@/components/CatalogSidebar/CatalogSidebar'
import { ProductList } from '@/components/ProductList/ProductList'
import { fetchProducts } from '@/entities/product/api/fetch-products'
import { importProductAdapter, useCategories } from '@/shared/adapters/import/product.adapter'
import { catalogPageLimit } from '@/shared/constants'
import { Flex } from 'antd'
import { useEffect, useState } from 'react'

export const CatalogPage: FC = () => {
  const [products, setProducts] = useState<ICleanProduct[]>([])
  const [total, setTotal] = useState<number | undefined>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useCategories()

  useEffect(() => {
    fetchProducts(currentPage)
      .then((response) => {
        const clearProducts = importProductAdapter(response.body.results)
        setProducts(clearProducts)
        setTotal(response.body.total)
      })
      .catch(() => {
        throw new Error('clean data not found')
      },
      )
  }, [currentPage])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  return (
    <>
      <Flex justify="space-between">
        <AppBreadcrumb />
        <CatalogSearch />
      </Flex>
      <Flex gap="large" style={{ marginTop: 40 }}>
        <CatalogSidebar />
        <Flex vertical gap="large">
          <ProductList products={products} />
          <CatalogPagination total={total} pageLimit={catalogPageLimit} current={currentPage} onChange={handlePageChange} />
        </Flex>
      </Flex>
    </>
  )
}
