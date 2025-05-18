// import { mockProducts } from '@/shared/constants'
// import { render, screen } from '@testing-library/react'
// import { vi } from 'vitest'
// import { RelatedProducts } from './RelatedProducts'

// const mockNavigate = vi.fn()

// vi.mock('react-router-dom', () => ({
//   // eslint-disable-next-line react-hooks-extra/no-unnecessary-use-prefix
//   useNavigate: () => mockNavigate,
// }))

// describe('relatedProducts', () => {
//   it('should render the component container', () => {
//     render(<RelatedProducts products={mockProducts} />)

//     const container = screen.getByTestId('related-products')

//     expect(container).toBeInTheDocument()
//   })

//   it('should display the title', () => {
//     render(<RelatedProducts products={mockProducts} />)

//     expect(screen.getByText('NEW')).toBeInTheDocument()
//   })

//   it('should render all product cards', () => {
//     render(<RelatedProducts products={mockProducts} />)

//     const productCards = screen.getAllByTestId('product-card')

//     expect(productCards).toHaveLength(4)
//   })

//   it('should have a "Go To Catalog" button', () => {
//     render(<RelatedProducts products={mockProducts} />)

//     const button = screen.getByText('Go To Catalog')

//     expect(button).toBeInTheDocument()
//   })

//   it('should navigate to /catalog when the button is clicked', () => {
//     render(<RelatedProducts products={mockProducts} />)

//     const button = screen.getByText('Go To Catalog')
//     button.click()

//     expect(mockNavigate).toHaveBeenCalledWith('/catalog')
//   })
// })
