import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RangeFilter } from './RangeFilter'

describe('rangeFilter', () => {
  const mockOnChange = vi.fn()

  it('should render the range filter component correctly', () => {
    render(
      <RangeFilter
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

  it('should update values when input changes', () => {
    render(
      <RangeFilter
        title="Price Range"
        icon="$"
        minValue={0}
        maxValue={100}
        onChange={mockOnChange}
        shouldUpdate={false}
      />,
    )

    const inputs = screen.getAllByRole('spinbutton')

    fireEvent.change(inputs[0], { target: { value: 10 } })
    expect(mockOnChange).toHaveBeenCalledWith([10, 100])

    fireEvent.change(inputs[1], { target: { value: 80 } })
    expect(mockOnChange).toHaveBeenCalledWith([10, 80])
  })
})
