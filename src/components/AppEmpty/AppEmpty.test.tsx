import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppEmpty } from './AppEmpty'

describe('appEmpty', () => {
  it('should render with default props', () => {
    render(<AppEmpty />)

    const emptyComponent = screen.getByTestId('empty')
    expect(emptyComponent).toBeInTheDocument()
    expect(emptyComponent).toHaveClass('empty')

    expect(screen.getByText('No beers')).toBeInTheDocument()
    expect(screen.getByText('No beers')).toHaveClass('empty-description')
  })

  it('should have the correct CSS classes', () => {
    const { container } = render(<AppEmpty />)

    expect(container.querySelector('.ant-empty')).toBeInTheDocument()
    expect(container.querySelector('.empty')).toBeInTheDocument()
    expect(container.querySelector('.empty-description')).toBeInTheDocument()
  })
})
