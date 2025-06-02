import type { ICleanProduct } from '@/entities/product/model/product.types'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductDescription } from './ProductDescription'

const mockProduct: ICleanProduct = {
  id: '1',
  title: 'Test Beer',
  category: 'Lager',
  country: 'Germany',
  brewery: 'Test Brewery',
  ABV: '5.0',
  IBU: '20',
  slug: 'test-beer',
  description: 'This is a test beer description',
  price: {
    amount: '10.99',
    discount: null,
  },
  images: [
    { url: 'image1.jpg', dimensions: { w: 800, h: 600 } },
  ],
}

describe('productDescription', () => {
  it('should render description container with testId', () => {
    render(<ProductDescription product={mockProduct} />)
    expect(screen.getAllByTestId('product-info')[0]).toBeInTheDocument()
  })

  it('should render product title', () => {
    render(<ProductDescription product={mockProduct} />)
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
  })

  it('should render discounted price when available', () => {
    const productWithDiscount = {
      ...mockProduct,
      price: { amount: '15.99', discount: '12.99' },
    }
    render(<ProductDescription product={productWithDiscount} />)

    expect(screen.getByText(/15\.99/)).toBeInTheDocument()
    expect(screen.getByText(/12\.99/)).toBeInTheDocument()
  })

  it('should render product characteristics', () => {
    render(<ProductDescription product={mockProduct} />)

    expect(screen.getByText(/Category:/)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.category!)).toBeInTheDocument()
    expect(screen.getByText(/Country:/)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.country)).toBeInTheDocument()
    expect(screen.getByText(/Brewery:/)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.brewery)).toBeInTheDocument()
    expect(screen.getByText(/ABV:/)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.ABV)).toBeInTheDocument()
    expect(screen.getByText(/IBU:/)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.IBU)).toBeInTheDocument()
  })

  it('should render product description', () => {
    render(<ProductDescription product={mockProduct} />)
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
  })

  it('should render "Add to Cart" button', () => {
    render(<ProductDescription product={mockProduct} />)
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })
})
