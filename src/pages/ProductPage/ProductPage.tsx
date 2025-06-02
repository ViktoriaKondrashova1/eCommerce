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
import { useRelatedProducts } from '@/pages/ProductPage/use-related-products'
import { useProductBySlug } from './use-product'

export const ProductPage: FC = () => {
  const navigate = useNavigate()
  const { product, isLoading, isError } = useProductBySlug()

  const { title = '', category = '' } = product || {}

  const { relatedProducts } = useRelatedProducts(title, category)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

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
                <RelatedProducts title="Related products" products={relatedProducts} showButton={false} />
              </>
            )}
    </>
  )
}
