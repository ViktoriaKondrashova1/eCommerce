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
import { useCategories } from '@/pages/MainPage/use-categories.ts'
import { useRelatedProducts } from '@/pages/ProductPage/use-related-products'
import { useProductBySlug } from './use-product'

export const ProductPage: FC = () => {
  const navigate = useNavigate()
  useCategories()
  const { product, isLoading, isError } = useProductBySlug()

  const { title = '', category = '' } = product || {}

  const { relatedProducts } = useRelatedProducts(title, category)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [window.location.href])

  const breadcrumbItems = [
    { href: '/', title:
      (
        <>
          <HomeOutlined />
          <span>Home</span>
        </>
      ) },
    { href: '/catalog/1', title:
      (
        <span>Catalog</span>
      ) },
    { href: `/catalog/category/${category}`, title: <span>{category}</span> },
    {
      title: product?.title,
    },
  ].map(crumb => ({ ...crumb, href: crumb?.href?.toLowerCase() }))

  if ((!product && !isLoading) || isError)
    return <AppEmpty />
  if (isLoading)
    return <AppSkeleton />
  if (isError)
    return <AppEmpty />

  if (product && !isLoading) {
    return (
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
    )
  }
}
