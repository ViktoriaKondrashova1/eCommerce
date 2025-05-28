import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { useRelatedProducts } from '@/components/RelatedProductsDescription/use-related-products'
import { Flex } from 'antd'
import { AppEmpty } from '../AppEmpty/AppEmpty'
import { AppSkeleton } from '../AppSkeleton/AppSkeleton'
import { AppTitle } from '../AppTitle/AppTitle'
import { ProductCard } from '../ProductCard/ProductCard'

interface Props extends BaseComponent {
  currentProduct: {
    title: string
    category: string | null
  }
}

export const RelatedProductsDescription: FC<Props> = ({ testId = 'related-products-info', currentProduct, ...rest }) => {
  const { title, category } = currentProduct
  const { relatedProducts, isLoading, isError } = useRelatedProducts(title, category)

  if (category == null)
    return null

  return (
    <Flex
      vertical
      gap="large"
      data-testid={testId}
      className="related-products"
      {...rest}
    >
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
                <AppTitle level={3}>Related products</AppTitle>
                <Flex wrap="wrap" justify="space-around" gap="large">
                  {relatedProducts?.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </Flex>
              </>
            )}
    </Flex>
  )
}
