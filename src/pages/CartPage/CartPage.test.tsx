import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { CartPage } from './CartPage'

vi.mock('@/components/CartTable/CartTable', () => ({
  CartTable: () => <div data-testid="cart-table" />,
}))

vi.mock('@/components/CartPromocode/CartPromocode', () => ({
  CartPromocode: () => <div data-testid="cart-promocode" />,
}))

vi.mock('@/components/CartTotal/CartTotal', () => ({
  CartTotal: () => <div data-testid="cart-total" />,
}))

vi.mock('@/components/RelatedProducts/RelatedProducts', () => ({
  RelatedProducts: () => <div data-testid="related-products" />,
}))

vi.mock('@/components/AppSkeleton/AppSkeleton', () => ({
  AppSkeleton: () => <div data-testid="app-skeleton" />,
}))

vi.mock('@/components/AppEmpty/AppEmpty', () => ({
  AppEmpty: () => <div data-testid="app-empty" />,
}))

describe('cartPage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render cart title and clear button', () => {
    render(<CartPage />)

    expect(screen.getByText('CART')).toBeInTheDocument()
    expect(screen.getByText('Clear Shopping Cart')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render all main components', () => {
    render(<CartPage />)

    expect(screen.getByTestId('cart-table')).toBeInTheDocument()
    expect(screen.getByTestId('cart-promocode')).toBeInTheDocument()
    expect(screen.getByTestId('cart-total')).toBeInTheDocument()
  })

  it('should have correct layout styling', () => {
    const { container } = render(<CartPage />)

    const mainContainer = container.firstChild
    expect(mainContainer).toHaveStyle('width: 80%')
    expect(mainContainer).toHaveStyle('margin: auto')
    expect(mainContainer).toHaveStyle('display: flex')
    expect(mainContainer).toHaveStyle('flex-direction: column')

    const headerSection = screen.getByText('CART').parentElement
    expect(headerSection).toHaveStyle('display: flex')
  })

  it('should have proper spacing between sections', () => {
    render(<CartPage />)

    const table = screen.getByTestId('cart-table')
    const promocode = screen.getByTestId('cart-promocode')
    const total = screen.getByTestId('cart-total')

    expect(table.nextSibling).toBe(promocode)
    expect(promocode.nextSibling).toBe(total)
  })
})
