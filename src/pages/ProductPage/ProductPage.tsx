import type { FC } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { AppButton } from '@/components/AppButton'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { ProductDescription } from '@/components/ProductDescription/ProductDescription'
import { RelatedProductsDescription } from '@/components/RelatedProductsDescription/RelatedProductsDescription'
import { ArrowLeftOutlined, HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useProductBySlug } from './use-product'

export const ProductPage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { product, isLoading, isError } = useProductBySlug()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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
        <>
          <UnorderedListOutlined />
          <span>Catalog</span>
        </>
      ) },
    {
      title: product?.title,
    },
  ]

  if (!product)
    return <AppEmpty />

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
                <RelatedProductsDescription
                  currentProduct={{
                    title: product.title,
                    category: product.category,
                  }}
                />
              </>
            )}
    </>
  )
}
