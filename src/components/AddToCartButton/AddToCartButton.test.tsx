import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { AddToCartButton } from './AddToCartButton'

const mockProductId = 'asweccddf'
const mockLineItemId = 'rfgvvfgf'

vi.mock('@ant-design/icons', () => ({
  PlusOutlined: () => <span data-testid="plus-icon">+</span>,
  CheckOutlined: () => <span data-testid="check-icon">✓</span>,
}))

vi.mock('@/entities/cart/api/update-cart', () => ({
  updateCart: vi.fn().mockResolvedValue({}),
}))

describe('addToCartButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it('should render correctly with default props', () => {
    render(<AddToCartButton productId={mockProductId} />)
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('should be disabled when product is in cart', () => {
    render(<AddToCartButton productId={mockProductId} lineItemId={mockLineItemId} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should show check icon when clicked and revert after timeout', async () => {
    render(<AddToCartButton productId={mockProductId} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByTestId('check-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('plus-icon')).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument()
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
