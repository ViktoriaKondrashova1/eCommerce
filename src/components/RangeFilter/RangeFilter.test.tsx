import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RangeFilter } from './RangeFilter'

describe('rangeFilter', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('should render the range filter component correctly', () => {
    render(
      <RangeFilter
        initialValue={[10, 15]}
        title="Price Range"
        icon="$"
        minValue={0}
        maxValue={100}
        onChange={mockOnChange}
        shouldUpdate={false}
      />,
    )

    expect(screen.getByText('Price Range')).toBeInTheDocument()
    expect(screen.getByTestId('range-filter')).toBeInTheDocument()
    expect(screen.getAllByRole('spinbutton')).toHaveLength(2)
    expect(screen.getAllByRole('slider')).toHaveLength(2)
    const sliders = screen.getAllByRole('slider')
    expect(sliders[0]).toBeInTheDocument()
    expect(sliders[1]).toBeInTheDocument()
  })
})
