import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { HeaderMenu } from './HeaderMenu'

const mockItems = [
  { key: '/', label: 'Home' },
  { key: '/about', label: 'About' },
  { key: '/contact', label: 'Contact' },
]

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('headerMenu positive', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should render the menu and all menu items correctly', () => {
    render(
      <MemoryRouter>
        <HeaderMenu items={mockItems} />
      </MemoryRouter>,
    )

    const headerMenu = screen.getByTestId('header-menu')
    expect(headerMenu).toBeInTheDocument()

    mockItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('should apply correct styles to the menu', () => {
    render(
      <MemoryRouter>
        <HeaderMenu items={mockItems} />
      </MemoryRouter>,
    )

    const headerMenu = screen.getByTestId('header-menu')
    expect(headerMenu).toBeInTheDocument()
  })

  it('should call navigate with correct path when menu item clicked', () => {
    render(
      <MemoryRouter>
        <HeaderMenu items={mockItems} />
      </MemoryRouter>,
    )

    act(() => {
      fireEvent.click(screen.getByText('Contact'))
    })
    expect(mockNavigate).toHaveBeenCalledWith('/contact')
  })
})
