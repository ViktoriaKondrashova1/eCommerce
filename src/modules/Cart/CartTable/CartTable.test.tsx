import type { CartDataType } from '@/entities/cart/model/cart.types'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartTable } from './CartTable'

function createTestData(): CartDataType[] {
  return [
    {
      key: '1',
      product: <div data-testid="product-1">Product 1</div>,
      price: '$10',
      quantity: <div data-testid="quantity-1">2</div>,
      subtotal: '$20',
    },
    {
      key: '2',
      product: <div data-testid="product-2">Product 2</div>,
      price: '$15',
      quantity: <div data-testid="quantity-2">1</div>,
      subtotal: '$15',
    },
  ]
}

describe('cartTable', () => {
  it('should render description container with testId', () => {
    render(
      <MemoryRouter>
        <CartTable tableData={createTestData()} />
      </MemoryRouter>,
    )
    expect(screen.getAllByTestId('cart-table')[0]).toBeInTheDocument()
  })

  it('should render all required column headers', () => {
    render(
      <MemoryRouter>
        <CartTable tableData={createTestData()} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByText('Quantity')).toBeInTheDocument()
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
  })
})
