import { mockProducts } from '@/shared/constants'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { NewProducts } from './NewProducts'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('newProducts', () => {
  it('should render the component container', () => {
    render(<NewProducts products={mockProducts} />)

    const container = screen.getByTestId('new-products')

    expect(container).toBeInTheDocument()
  })

  it('should display the title', () => {
    render(<NewProducts products={mockProducts} />)

    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('should render all product cards', () => {
    render(<NewProducts products={mockProducts} />)

    const productCards = screen.getAllByTestId('product-card')

    expect(productCards).toHaveLength(4)
  })

  it('should have a "Go To Catalog" button', () => {
    render(<NewProducts products={mockProducts} />)

    const button = screen.getByText('Go To Catalog')

    expect(button).toBeInTheDocument()
  })

  it('should navigate to /catalog when the button is clicked', () => {
    render(<NewProducts products={mockProducts} />)

    const button = screen.getByText('Go To Catalog')
    button.click()

    expect(mockNavigate).toHaveBeenCalledWith('/catalog')
  })
})
