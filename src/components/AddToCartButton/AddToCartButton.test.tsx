import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { AddToCartButton } from './AddToCartButton'

const mockProductId = 'asweccddf'
const mockLineItemId = 'rfgvvfgf'

vi.mock('@ant-design/icons', () => ({
  PlusOutlined: () => <span data-testid="plus-icon">+</span>,
  CheckOutlined: () => <span data-testid="check-icon">✓</span>,
}))

describe('addToCartButton', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render plus icon when product is not in cart', () => {
    render(<AddToCartButton productId={mockProductId} />)

    expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('should render check icon and be disabled when product is in cart', () => {
    render(<AddToCartButton productId={mockProductId} lineItemId={mockLineItemId} />)

    expect(screen.getByTestId('check-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('plus-icon')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should stop click event propagation', () => {
    const handleParentClick = vi.fn()
    render(
      <div onClick={handleParentClick}>
        <AddToCartButton productId={mockProductId} />
      </div>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(handleParentClick).not.toHaveBeenCalled()
  })
})
