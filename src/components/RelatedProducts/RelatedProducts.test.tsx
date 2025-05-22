import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { RelatedProducts } from './RelatedProducts'
import { mockProducts } from './test-mock'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({

  useNavigate: () => mockNavigate,
}))

const mockTitle = 'Test Title'

describe('relatedProducts', () => {
  beforeEach(() => {
    render(<RelatedProducts title={mockTitle} products={mockProducts} />)
  })

  it('should render the component container', () => {
    const container = screen.getByTestId('related-products')

    expect(container).toBeInTheDocument()
  })

  it('should display the title', () => {
    expect(screen.getByText(mockTitle)).toBeInTheDocument()
  })

  it('should render all product cards', () => {
    const productCards = screen.getAllByTestId('product-card')

    expect(productCards).toHaveLength(4)
  })

  it('should have a "Go To Catalog" button', () => {
    const button = screen.getByText('Go To Catalog')

    expect(button).toBeInTheDocument()
  })

  it('should navigate to /catalog when the button is clicked', () => {
    const button = screen.getByText('Go To Catalog')
    button.click()

    expect(mockNavigate).toHaveBeenCalledWith('/catalog')
  })
})
