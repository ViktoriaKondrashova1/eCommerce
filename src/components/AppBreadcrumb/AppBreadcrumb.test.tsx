import { render, screen } from '@testing-library/react'
import { AppBreadcrumb } from './AppBreadcrumb'

describe('appBreadcrumb', () => {
  it('should render with default items when no items prop is provided', () => {
    render(<AppBreadcrumb />)

    const breadcrumb = screen.getByTestId('breadcrumb')
    expect(breadcrumb).toBeInTheDocument()

    const homeLink = screen.getByText('Home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')

    expect(screen.getByText('Catalog')).toBeInTheDocument()
  })

  it('should render with custom items when items prop is provided', () => {
    const customItems = [
      { title: 'Dashboard' },
      { title: 'Products', href: '/products' },
    ]

    render(<AppBreadcrumb items={customItems} />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()

    const productsLink = screen.getByText('Products')
    expect(productsLink).toBeInTheDocument()
    expect(productsLink.closest('a')).toHaveAttribute('href', '/products')
  })

  it('applies default styles', () => {
    render(<AppBreadcrumb />)

    const breadcrumb = screen.getByTestId('breadcrumb')

    expect(breadcrumb).toHaveStyle('display: flex')
    expect(breadcrumb).toHaveStyle('align-items: center')
  })

  it('should render HomeOutlined icon in default home item', () => {
    render(<AppBreadcrumb />)

    expect(document.querySelector('.anticon-home')).toBeInTheDocument()
  })
})
