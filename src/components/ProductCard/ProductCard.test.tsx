import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductCard } from './ProductCard'
import { mockProduct } from './test-mock'

describe('productCard', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>)
  }

  it('should render all product information correctly', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)

    expect(screen.getByTestId('product-card')).toBeInTheDocument()
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.brewery)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument()
  })

  it('should render the add to cart button with tooltip', async () => {
    renderWithRouter(<ProductCard product={mockProduct} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    const icon = button.querySelector('span.anticon-plus')
    expect(icon).toBeInTheDocument()

    fireEvent.mouseEnter(button)
    expect(await screen.findByText('Add to Cart')).toBeInTheDocument()
  })
})
