import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { AddOrRemoveFormCartButton } from './AddOrRemoveFormCartButton'

const mockProductId = '123456789'
const mockLineItemId = 'qwerty123'

vi.mock('@ant-design/icons', () => ({
  ShoppingCartOutlined: () => <span data-testid="cart-icon">CartIcon</span>,
}))

describe('addOrRemoveFormCartButton', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render "Add to Cart" with icon when product not in cart', () => {
    render(<AddOrRemoveFormCartButton productId={mockProductId} />)

    expect(screen.getByTestId('cart-icon')).toBeInTheDocument()
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('should render "Remove from Cart" with icon when product in cart', () => {
    render(<AddOrRemoveFormCartButton productId={mockProductId} lineItemId={mockLineItemId} />)

    expect(screen.getByTestId('cart-icon')).toBeInTheDocument()
    expect(screen.getByText('Remove from Cart')).toBeInTheDocument()
    expect(screen.getByRole('button')).not.toBeDisabled()
  })
})
