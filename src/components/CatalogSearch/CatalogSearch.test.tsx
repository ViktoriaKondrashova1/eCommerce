import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { CatalogSearch } from './CatalogSearch'

describe('catalogSearch', () => {
  it('should render the search component correctly', () => {
    render(<CatalogSearch onChange={() => {}} />)

    const search = screen.getByTestId('catalog-search')

    expect(search).toBeInTheDocument()
    expect(screen.getByText('Search:')).toBeInTheDocument()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('should call onChange when input value changes', () => {
    const handleChange = vi.fn()
    render(<CatalogSearch onChange={handleChange} />)

    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'test query' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith('test query')
  })
})
