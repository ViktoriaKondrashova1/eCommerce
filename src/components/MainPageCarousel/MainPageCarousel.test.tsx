import { render, screen } from '@testing-library/react'
import { Grid } from 'antd'
import { vi } from 'vitest'
import { MainPageCarousel } from './MainPageCarousel'

vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('antd')>()
  return {
    ...actual,
    Grid: {
      useBreakpoint: vi.fn(),
    },
  }
})

vi.mock('@/shared/constants', () => ({
  carouselData: [
    { id: 1, title: 'Style 1', image: 'image1.jpg' },
    { id: 2, title: 'Style 2', image: 'image2.jpg' },
    { id: 3, title: 'Style 3', image: 'image3.jpg' },
    { id: 4, title: 'Style 4', image: 'image4.jpg' },
    { id: 5, title: 'Style 5', image: 'image5.jpg' },
    { id: 6, title: 'Style 6', image: 'image6.jpg' },
    { id: 7, title: 'Style 7', image: 'image7.jpg' },
    { id: 8, title: 'Style 8', image: 'image8.jpg' },
  ],
}))

describe('mainPageCarousel', () => {
  const mockCarouselData = [
    { id: 1, title: 'Style 1', image: 'image1.jpg' },
    { id: 2, title: 'Style 2', image: 'image2.jpg' },
    { id: 3, title: 'Style 3', image: 'image3.jpg' },
    { id: 4, title: 'Style 4', image: 'image4.jpg' },
    { id: 5, title: 'Style 5', image: 'image5.jpg' },
    { id: 6, title: 'Style 6', image: 'image6.jpg' },
    { id: 7, title: 'Style 7', image: 'image7.jpg' },
    { id: 8, title: 'Style 8', image: 'image8.jpg' },
  ]

  afterEach(() => {
    vi.clearAllMocks()
  })

  const setup = (breakpoints = { xs: true, sm: true, md: true, lg: true }) => {
    vi.mocked(Grid.useBreakpoint).mockReturnValue(breakpoints)
    return render(<MainPageCarousel />)
  }

  it('should render carousel and title correctly', () => {
    setup()

    const carousel = screen.getByTestId('main-page-carousel')

    expect(carousel).toBeInTheDocument()
    expect(screen.getByText('CHOOSE YOUR STYLE')).toBeInTheDocument()
  })

  it('should render carousel with correct number of slides for mobile (xs)', () => {
    setup({ xs: true, sm: false, md: false, lg: false })

    const slides = screen.getAllByRole('listitem')

    expect(slides).toHaveLength(Math.ceil(mockCarouselData.length / 1))
  })

  it('should render carousel with correct number of slides for small tablets (sm)', () => {
    setup({ xs: false, sm: true, md: false, lg: false })

    const slides = screen.getAllByRole('listitem')

    expect(slides).toHaveLength(Math.ceil(mockCarouselData.length / 2))
  })

  it('should render carousel with correct number of slides for desktop (md)', () => {
    setup({ xs: false, sm: true, md: true, lg: false })

    const slides = screen.getAllByRole('listitem')

    expect(slides).toHaveLength(Math.ceil(mockCarouselData.length / 4))
  })
})
