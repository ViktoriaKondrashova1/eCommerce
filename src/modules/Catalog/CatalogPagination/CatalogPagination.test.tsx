import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CatalogPagination } from './CatalogPagination.tsx'
import '@testing-library/jest-dom'

describe('catalogPagination', () => {
  const mockOnChange = vi.fn()

  const defaultProps = {
    total: 100,
    pageLimit: 10,
    current: 1,
    onChange: mockOnChange,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with default props', () => {
    render(<CatalogPagination {...defaultProps} />)

    const pagination = screen.getByTestId('pagination')
    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveClass('ant-pagination')

    const items = screen.getAllByRole('listitem')
    expect(items.length).toBeGreaterThan(5)
  })

  it('should call onChange when page is changed', () => {
    render(<CatalogPagination {...defaultProps} />)

    fireEvent.click(screen.getByText('2'))
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(2, 10)
  })

  it('should hide when total is less than pageLimit', () => {
    const { container } = render(
      <CatalogPagination {...defaultProps} total={5} pageLimit={10} />,
    )

    expect(container.firstChild).toBeNull()
  })

  it('should show correct page count based on total and pageLimit', () => {
    render(<CatalogPagination {...defaultProps} total={50} pageLimit={5} />)

    expect(screen.getByText('10')).toBeInTheDocument()
  })
})
