import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { vi } from 'vitest'
import { NotFoundPage } from './NotFoundPage'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

describe('notFoundPage', () => {
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly with default props', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )

    const notFound = screen.getByTestId('not-found-page')

    expect(notFound).toBeInTheDocument()
    expect(screen.getByText('404: Beer Not Found!')).toBeInTheDocument()
    expect(
      screen.getByText('Sorry, the page you visited does not exist.'),
    ).toBeInTheDocument()
    expect(screen.getByAltText('broken beer')).toBeInTheDocument()
    expect(screen.getByText('Back Home')).toBeInTheDocument()
    expect(screen.getByText('Explore Beers')).toBeInTheDocument()
  })

  it('should navigate to home when "Back Home" button is clicked', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByText('Back Home'))
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('should navigate to catalog when "Explore Beers" button is clicked', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByText('Explore Beers'))
    expect(mockNavigate).toHaveBeenCalledWith('/catalog/1')
  })
})
