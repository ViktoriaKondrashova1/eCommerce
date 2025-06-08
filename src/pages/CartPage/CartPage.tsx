import type { FC } from 'react'
import type { ICleanProduct } from '@/entities/product/model/product.types'
import { ClearOutlined } from '@ant-design/icons'
import { Flex, Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'
import { AppButton } from '@/components/AppButton'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { AppTitle } from '@/components/AppTitle/AppTitle'
import { CartPromocode } from '@/components/CartPromocode/CartPromocode'
import { CartTable } from '@/components/CartTable/CartTable'
import { CartTotal } from '@/components/CartTotal/CartTotal'
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts'
import { cartStore } from '@/entities/cart/model/cart.store'
import { getFourRandomProducts } from '@/entities/product/api/get-four-random-products'
import { useRequest } from '@/shared/hooks/use-request'
import { isNonNullable } from '@/shared/types/is-non-nullable'
import { adaptCartData } from './adapt-cart-data'

export const CartPage: FC = observer(() => {
  const {
    data: popularProducts,
    isLoading,
    isError,
  } = useRequest<ICleanProduct[]>(getFourRandomProducts)

  const cart = cartStore.getCart()
  const cartData = cart ? adaptCartData(cart.lineItems) : null

  const handleClearCart = () => {
    cartStore.clearCart()
  }

  const totalQuantity = cart?.lineItems.reduce((sum, item) => sum + item.quantity, 0) ?? 0
  const totalAmount = cart !== null && isNonNullable(cart?.totalPrice.centAmount) ? cart.totalPrice.centAmount / 100 : 0

  return (
    <Flex vertical style={{ width: '80%', margin: 'auto' }}>
      <Flex justify="space-between">
        <AppTitle level={2}>CART</AppTitle>
        <Popconfirm title="Your shopping cart will be emptied. Continue?" onConfirm={handleClearCart}>
          <AppButton
            type="primary"
            icon={<ClearOutlined />}
          >
            Clear Shopping Cart
          </AppButton>
        </Popconfirm>

      </Flex>
      <CartTable tableData={cartData} />
      <CartPromocode />
      <CartTotal
        quantity={totalQuantity}
        total={totalAmount}
      />
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
})
