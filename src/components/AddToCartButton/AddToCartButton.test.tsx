import { act, fireEvent, render, screen } from '@testing-library/react'
import { AddToCartButton } from './AddToCartButton'

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
    render(<AddToCartButton product={mockProduct} />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
    expect(button).toHaveClass('ant-btn-circle')
  })

  it('should show check icon when clicked and revert after timeout', async () => {
    render(<AddToCartButton product={mockProduct} />)

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
        <AddToCartButton product={mockProduct} />
      </div>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(handleParentClick).not.toHaveBeenCalled()
  })
})
