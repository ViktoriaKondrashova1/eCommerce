import { render, screen } from '@testing-library/react'
import { MainPageGrid } from './MainPageGrid.tsx'

describe('mainPageGrid', () => {
  it('should render the grid container', () => {
    render(<MainPageGrid />)

    const gridContainer = screen.getByTestId('main-page-grid')

    expect(gridContainer).toBeInTheDocument()
  })

  it('should render all grid items', () => {
    render(<MainPageGrid />)

    const gridItems = screen.getAllByRole('img')
    const titles = screen.getAllByRole('heading')

    expect(gridItems).toHaveLength(4)
    expect(titles).toHaveLength(2)
  })

  it('should apply correct background colors', () => {
    render(<MainPageGrid />)

    const gridContainer = screen.getByTestId('main-page-grid')
    const cards = gridContainer.querySelectorAll('.grid-section-card')

    expect(cards[1]).toHaveStyle({ backgroundColor: 'inherit' })
    expect(cards[3]).toHaveStyle({ backgroundColor: 'inherit' })
  })
})
