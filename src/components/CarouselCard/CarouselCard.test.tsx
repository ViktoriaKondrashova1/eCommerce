import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CarouselCard } from './CarouselCard'

const mockProps = {
  title: 'TEST CARD TITLE',
  image: 'https://example.com/test-image.jpg',
}

describe('carouselCard', () => {
  it('should render correctly with provided props', () => {
    render(
      <MemoryRouter>
        <CarouselCard {...mockProps} />
      </MemoryRouter>,
    )

    const card = screen.getByTestId('carousel-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('main-carousel-card')

    const title = screen.getByText(mockProps.title)
    expect(title).toBeInTheDocument()

    const image = screen.getByAltText(mockProps.title)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockProps.image)
  })

  it('should have hoverable effect', () => {
    render(
      <MemoryRouter>
        <CarouselCard {...mockProps} />
      </MemoryRouter>,
    )

    const card = screen.getByTestId('carousel-card')
    expect(card).toHaveClass('ant-card-hoverable')
  })

  it('should render AppTitle component inside Meta', () => {
    render(
      <MemoryRouter>
        <CarouselCard {...mockProps} />
      </MemoryRouter>,
    )

    const titleElement = screen.getByText(mockProps.title)
    expect(titleElement.tagName).toBe('H4')
  })
})
