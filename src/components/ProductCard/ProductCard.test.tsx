import { fireEvent, render, screen } from '@testing-library/react'
import { ProductCard } from './ProductCard'

const mockCardData = {
  title: 'Test Beer',
  imageUrl: 'https://example.com/beer.jpg',
  price: '$6.99',
  category: 'IPA',
  brewery: 'Test Brewery',
  discount: '$5.99',
}

describe('productCard', () => {
  it('should render all product information correctly', () => {
    render(<ProductCard {...mockCardData} />)

    expect(screen.getByTestId('product-card')).toBeInTheDocument()
    expect(screen.getByText(mockCardData.title)).toBeInTheDocument()
    expect(screen.getByText(mockCardData.brewery)).toBeInTheDocument()
    expect(screen.getByText(mockCardData.category)).toBeInTheDocument()
    expect(screen.getByText(mockCardData.price)).toBeInTheDocument()
    expect(screen.getByText(mockCardData.discount)).toBeInTheDocument()
  })

  it('should show discounted price when discount is provided', () => {
    render(<ProductCard {...mockCardData} />)

    const originalPrice = screen.getByText(mockCardData.price)
    expect(originalPrice).toHaveStyle('text-decoration: line-through')
    expect(screen.getByText(mockCardData.discount)).toHaveStyle('color: #E84B1A')
  })

  it('should not show discount when discount is not provided', () => {
    const { price } = mockCardData
    render(<ProductCard {...mockCardData} discount={undefined} />)

    expect(screen.getByText(price)).toBeInTheDocument()
    expect(screen.queryByText(mockCardData.discount)).not.toBeInTheDocument()
    expect(screen.getByText(price)).not.toHaveStyle('text-decoration: line-through')
  })

  it('should render the product image with correct alt text', () => {
    render(<ProductCard {...mockCardData} />)

    const image = screen.getByAltText(mockCardData.title)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCardData.imageUrl)
  })

  it('should render the add to cart button with tooltip', async () => {
    render(<ProductCard {...mockCardData} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    const icon = button.querySelector('span.anticon-plus')
    expect(icon).toBeInTheDocument()

    fireEvent.mouseEnter(button)
    expect(await screen.findByText('Add to Cart')).toBeInTheDocument()
  })
})
