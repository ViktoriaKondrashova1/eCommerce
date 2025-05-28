import { act, fireEvent, render, screen } from '@testing-library/react'
import { AddToCartButton } from './AddToCartButton'

vi.mock('@ant-design/icons', () => ({
  PlusOutlined: () => <span data-testid="plus-icon">+</span>,
  CheckOutlined: () => <span data-testid="check-icon">✓</span>,
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
    render(<AddToCartButton />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
    expect(button).toHaveClass('ant-btn-circle')
  })

  it('should show check icon when clicked and revert after timeout', async () => {
    render(<AddToCartButton />)

    fireEvent.click(screen.getByRole('button'))

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
        <AddToCartButton />
      </div>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(handleParentClick).not.toHaveBeenCalled()
  })
})
