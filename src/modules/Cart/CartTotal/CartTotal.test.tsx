import type { Props } from './CartTotal'
import { render, screen } from '@testing-library/react'
import { CartTotal } from './CartTotal'

describe('cartTotal', () => {
  const renderComponent = (props: Props) => {
    return render(<CartTotal {...props} />)
  }

  const defaultProps: Props = {
    quantity: 3,
    total: 99.99,
    withDiscount: 0,
  }

  it('renders correctly with default props', () => {
    renderComponent(defaultProps)

    expect(screen.getByText('Item(s):')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Total:')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeInTheDocument()
  })

  it('displays correct quantity', () => {
    const props: Props = {
      ...defaultProps,
      quantity: 5,
    }
    renderComponent(props)

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('displays correct total without discount', () => {
    const props: Props = {
      ...defaultProps,
      total: 150.5,
    }
    renderComponent(props)

    expect(screen.getByText('$150.50')).toBeInTheDocument()
    expect(screen.queryByText(/line-through/)).not.toBeInTheDocument()
  })

  it('displays discounted price when withDiscount is provided', () => {
    const props: Props = {
      ...defaultProps,
      total: 90,
      withDiscount: 10,
    }
    renderComponent(props)

    expect(screen.getByText('$100.00')).toBeInTheDocument()
    expect(screen.getByText('$90.00')).toBeInTheDocument()
    expect(screen.getByText('$100.00')).toHaveStyle('text-decoration: line-through')
    expect(screen.getByText('$90.00')).toHaveStyle('color: #E84B1A')
  })

  it('has correct layout and styles', () => {
    renderComponent(defaultProps)

    const container = screen.getByTestId('cart-total')
    expect(container).toHaveStyle('margin: 40px 0 100px 0')
    expect(container).toHaveStyle('align-items: end')
  })
})
