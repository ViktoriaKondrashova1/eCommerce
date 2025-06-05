import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import { ClearOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { AppButton } from '@/components/AppButton'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { AppTitle } from '@/components/AppTitle/AppTitle'
import { CartPromocode } from '@/components/CartPromocode/CartPromocode'
import { CartTable } from '@/components/CartTable/CartTable'
import { CartTableProduct } from '@/components/CartTableProduct/CartTableProduct'
import { CartTotal } from '@/components/CartTotal/CartTotal'
import { Incrementer } from '@/components/Incrementer/Incrementer'
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts'
import { getFourRandomProducts } from '@/entities/product/api/get-four-random-products'
import { useRequest } from '@/shared/hooks/use-request'

const mockProduct = {
  ABV: '5%',
  IBU: 'N/D',
  brewery: 'Brewery Name',
  country: 'USA',
  category: 'IPA',
  title: 'Beer Name',
  description: 'Test',
  slug: 'Test',
  id: 'Test',
  price: {
    amount: '$5.30',
    discount: '$4.60',
  },
  images: [{ url: 'https://i.pinimg.com/736x/32/97/4c/32974cc6f4b9c772671cc2fa81bcf206.jpg', dimensions: { w: 100, h: 150 } }],
}

export interface DataType {
  key: React.Key
  product: React.ReactNode
  price: string
  quantity: React.ReactNode
  subtotal: string
}

const data: DataType[] = [
  {
    key: '1',
    product: (<CartTableProduct product={mockProduct} />),
    price: mockProduct.price.amount,
    quantity: (<Incrementer />),
    subtotal: '$10.60',
  },
  {
    key: '2',
    product: (<CartTableProduct product={mockProduct} />),
    price: mockProduct.price.amount,
    quantity: (<Incrementer />),
    subtotal: '$10.60',
  },
]

export const CartPage: FC = () => {
  const {
    data: popularProducts,
    isLoading,
    isError,
  } = useRequest<ICleanProduct[]>(getFourRandomProducts)

  return (
    <Flex vertical style={{ width: '80%', margin: 'auto' }}>
      <Flex justify="space-between">
        <AppTitle level={2}>CART</AppTitle>
        <AppButton type="primary" icon={<ClearOutlined />}>Clear Shopping Cart</AppButton>
      </Flex>
      <CartTable tableData={data} />
      <CartPromocode />
      <CartTotal quantity={3} total={10.60} />
      {isLoading
        ? (
            <AppSkeleton />
          )
        : isError
          ? (
              <AppEmpty />
            )
          : (
              <RelatedProducts title="POPULAR PRODUCTS" products={popularProducts || []} />
            )}
    </Flex>
  )
}
