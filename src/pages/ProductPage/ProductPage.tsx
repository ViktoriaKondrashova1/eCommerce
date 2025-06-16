import type { FC } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { useBreadcrumb } from '@/components/AppBreadcrumb/use-breadcrumb'
import { AppButton } from '@/components/AppButton'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts'
import { useRelatedProducts } from '@/components/RelatedProducts/use-related-products.ts'
import { categoryStore } from '@/entities/category/model/category.store'
import { ProductDescription, useProductBySlug } from '@/modules/Product'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCategories } from '../MainPage/use-categories'

export const ProductPage: FC = () => {
  const navigate = useNavigate()
  useCategories()
  const { product, isLoading, isError } = useProductBySlug()
  const productCategory = (categoryStore.getCategoryByName(product?.category ?? ''))
  const { title = '', category = '' } = product || {}
  const { relatedProducts } = useRelatedProducts(title, category)
  const { breadcrumbItems } = useBreadcrumb()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const extendedBreadcrumbItems = [
    ...breadcrumbItems.map((item) => {
      if (item.key === 'catalog') {
        return {
          ...item,
          title: <Link to="/catalog/1">Catalog</Link>,
        }
      }
      return item
    }),
    ...(productCategory
      ? [
          {
            key: 'category',
            title: (
              <Link to={`/catalog/category/${productCategory.slug['en-US']}`}>
                {productCategory.name['en-US']}
              </Link>
            ),
          },
        ]
      : []),
    {
      key: 'product',
      title: <span>{product?.title}</span>,
    },
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
                  <AppBreadcrumb items={extendedBreadcrumbItems} />
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
                <RelatedProducts title="RELATED PRODUCTS" products={relatedProducts} showButton={false} />
              </>
            )}
    </>
  )
}
