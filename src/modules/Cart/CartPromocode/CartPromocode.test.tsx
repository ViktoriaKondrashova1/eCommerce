import type { Cart } from '@commercetools/platform-sdk'
import { applyPromoCode } from '@/entities/cart/api/apply-promo-code'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { CartPromocode } from './CartPromocode'
import { createTestCart, createTestLineItem } from './testData'

const mockCartStore = {
  cart: null as Cart | null,
  doesCartExist: false,
  getCart: vi.fn(() => mockCartStore.cart),
  setCart: vi.fn((cart: Cart) => {
    mockCartStore.cart = cart
    mockCartStore.doesCartExist = true
  }),
  updateCart: vi.fn(),
  clearCart: vi.fn(),
}

vi.mock('@/entities/cart/model', () => ({
  cartStore: mockCartStore,
}))

vi.mock('./get-cart-discount', () => ({
  getDiscountCodes: vi.fn(async () => Promise.resolve({ body: { results: [] } })),
}))

vi.mock('@/entities/cart/api/apply-promo-code', () => ({
  applyPromoCode: vi.fn(async () => Promise.resolve()),
}))

describe('cartPromocode', () => {
  const mockApplyPromoCode = vi.mocked(applyPromoCode)

  beforeEach(() => {
    vi.clearAllMocks()
    mockCartStore.cart = null
    mockCartStore.doesCartExist = false
  })

  it('should render promo code input and apply button', () => {
    render(<CartPromocode />)
    expect(screen.getByPlaceholderText('Enter promo code')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument()
    expect(screen.getByText('Promo Code')).toBeInTheDocument()
  })

  it('should disable button when input is empty', () => {
    render(<CartPromocode />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should enable button when input has value', async () => {
    render(<CartPromocode />)

    const input = screen.getByPlaceholderText('Enter promo code')
    fireEvent.change(input, { target: { value: 'TEST10' } })

    await waitFor(() => {
      expect(screen.getByRole('button')).not.toBeDisabled()
    })
  })

  it('should apply promo code successfully', async () => {
    mockCartStore.cart = createTestCart({
      lineItems: [createTestLineItem()],
      discountCodes: [],
    })

    mockApplyPromoCode.mockResolvedValue(undefined)

    render(<CartPromocode />)

    fireEvent.change(screen.getByPlaceholderText('Enter promo code'), { target: { value: 'TEST10' } })
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(mockApplyPromoCode).toHaveBeenCalledWith('TEST10')
      expect(screen.getByPlaceholderText('Enter promo code')).toHaveValue('')
    })
  })

  it('should show error when promo code application fails', async () => {
    mockCartStore.cart = createTestCart({
      lineItems: [createTestLineItem()],
      discountCodes: [],
    })

    mockApplyPromoCode.mockRejectedValue(new Error('Invalid promo code'))

    render(<CartPromocode />)

    const input = screen.getByPlaceholderText('Enter promo code')
    fireEvent.change(input, { target: { value: 'INVALID' } })
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('Invalid promo code')).toBeInTheDocument()
    })
  })
})
