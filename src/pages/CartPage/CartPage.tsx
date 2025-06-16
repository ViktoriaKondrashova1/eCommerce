import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { FC } from 'react'
import { AppButton } from '@/components/AppButton'
import { AppEmpty } from '@/components/AppEmpty/AppEmpty'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { AppTitle } from '@/components/AppTitle/AppTitle'
import { CartPromocode } from '@/components/CartPromocode/CartPromocode'
import { CartTable } from '@/components/CartTable/CartTable'
import { CartTotal } from '@/components/CartTotal/CartTotal'
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts'
import { clearCart } from '@/entities/cart/api/clear-cart'
import { cartStore } from '@/entities/cart/model/cart.store'
import { getFourRandomProducts } from '@/entities/product/api/get-four-random-products'
import { useRequest } from '@/shared/hooks/use-request'
import { isNonNullable } from '@/shared/types/is-non-nullable'
import { ClearOutlined } from '@ant-design/icons'
import { Flex, Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'
import { adaptCartData } from './adapt-cart-data'
import './CartPage.scss'

export const CartPage: FC = observer(() => {
  const {
    data: popularProducts,
    isLoading,
    isError,
  } = useRequest<ICleanProduct[]>(getFourRandomProducts)

  const cart = cartStore.getCart()
  const cartData = cart ? adaptCartData(cart.lineItems) : null

  const handleClearCart = () => {
    clearCart().catch((error) => {
      console.error('Failed to clear cart:', error)
    })
  }

  const totalAmount = cart !== null && isNonNullable(cart?.totalPrice.centAmount) ? cart.totalPrice.centAmount / 100 : 0
  const withDiscount = cart !== null
    && cart?.discountOnTotalPrice?.discountedAmount?.centAmount !== undefined
    ? cart.discountOnTotalPrice.discountedAmount.centAmount / 100
    : 0

  return (
    <Flex vertical style={{ width: '80%', margin: 'auto' }}>
      <Flex className="cart-page">
        <AppTitle level={2}>CART</AppTitle>
        <Popconfirm title="Your shopping cart will be emptied. Continue?" onConfirm={handleClearCart}>
          <AppButton
            className="clear-cart-button"
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
        quantity={cart?.totalLineItemQuantity ?? 0}
        total={totalAmount}
        withDiscount={withDiscount}
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
