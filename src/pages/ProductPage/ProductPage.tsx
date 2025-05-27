import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { FC } from 'react'
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb'
import { AppButton } from '@/components/AppButton'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { ProductInfo } from '@/components/ProductInfo/ProductInfo'
import { fetchProductBySlug } from '@/entities/product/api/fetch-products'
import { importProductAdapter } from '@/shared/adapters/import/product.adapter'
import { ArrowLeftOutlined, HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const ProductPage: FC = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState<ICleanProduct>()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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

  useEffect(() => {
    if (slug == null)
      return

    const loadProduct = async () => {
      try {
        setLoading(true)
        const durtyProduct = await fetchProductBySlug(slug)
        const product = importProductAdapter(durtyProduct.body.results)[0]
        setProduct(product)
      }
      finally {
        setLoading(false)
      }
    }

    void loadProduct()
  }, [slug])

  if (loading)
    return <AppSkeleton />
  if (!product)
    return <AppEmpty />

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
      <ProductInfo product={product} />
    </>
  )
}
