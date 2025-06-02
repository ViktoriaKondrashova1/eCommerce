import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { SortingSelect } from './SortingSelect'

describe('sortingSelect', () => {
  const mockOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ]

  it('should render the sorting select component correctly', () => {
    render(<SortingSelect title="Select an option" options={mockOptions} onChange={() => {}} shouldUpdate={false} />)

    const sortingSelect = screen.getByTestId('sorting-select')

    expect(sortingSelect).toBeInTheDocument()
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })
})
