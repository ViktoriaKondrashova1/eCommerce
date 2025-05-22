import { fireEvent, render, screen } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import { mockProduct } from './test-mock'

describe('productCard', () => {
  it('should render all product information correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByTestId('product-card')).toBeInTheDocument()
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.brewery)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument()
  })

  it('should render the add to cart button with tooltip', async () => {
    render(<ProductCard product={mockProduct} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    const icon = button.querySelector('span.anticon-plus')
    expect(icon).toBeInTheDocument()

    fireEvent.mouseEnter(button)
    expect(await screen.findByText('Add to Cart')).toBeInTheDocument()
  })
})
