import type { FC } from 'react'
import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { AppButton } from '@/components/AppButton'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { ProductDescription } from '@/components/ProductDescription/ProductDescription'
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts'
import { categoryStore } from '@/entities/category/model/category.store'
import { useRelatedProducts } from '@/pages/ProductPage/use-related-products'
import { useCategories } from '../MainPage/use-categories'
import { useProductBySlug } from './use-product'

export const ProductPage: FC = () => {
  const navigate = useNavigate()

  useCategories()

  const { product, isLoading, isError } = useProductBySlug()

  const productCategory = (categoryStore.getCategoryByName(product?.category ?? ''))

  const { title = '', category = '' } = product || {}

  const { relatedProducts } = useRelatedProducts(title, category)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

  const breadcrumbItems = [
    { key: 'home', href: '/', title:
      (
        <>
          <HomeOutlined />
          <span>Home</span>
        </>
      ) },
    { key: 'catalog', href: '/catalog/1', title: (<span>Catalog</span>) },
    { key: 'category', href: `/catalog/category/${productCategory?.slug['en-US']}`, title: (<span>{productCategory?.name['en-US']}</span>) },
    { key: 'product', title: (<span>{product?.title}</span>) },
  ]

  if (!product || !productCategory)
    return <AppSkeleton />

  return (
    <>
      {isLoading
        ? (
            <AppSkeleton />
          )
        : isError
          ? (
              <AppEmpty />
            )
          : (
              <>
                <Flex justify="space-between" style={{ marginBottom: '40px' }}>
                  <AppBreadcrumb items={breadcrumbItems} />
                  <AppButton
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    iconPosition="start"
                    onClick={() => navigate('/catalog/1')}
                    style={{ margin: '0' }}
                  >
                    Back To Catalog
                  </AppButton>
                </Flex>
                <ProductDescription product={product} />
                <RelatedProducts title="Related products" products={relatedProducts} showButton={false} />
              </>
            )}
    </>
  )
}
