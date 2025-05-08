import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { AppHeaderMenu } from './AppHeaderMenu'

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
    // eslint-disable-next-line react-hooks-extra/no-unnecessary-use-prefix
    useNavigate: () => mockNavigate,
  }
})

describe('appHeaderMenu positive', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should render the menu and all menu items correctly', () => {
    render(
      <MemoryRouter>
        <AppHeaderMenu items={mockItems} />
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
        <AppHeaderMenu items={mockItems} />
      </MemoryRouter>,
    )

    const headerMenu = screen.getByTestId('header-menu')
    expect(headerMenu).toHaveStyle({
      background: 'inherit',
      whiteSpace: 'nowrap',
      borderBottom: 'none',
    })
  })

  it('should call navigate with correct path when menu item clicked', () => {
    render(
      <MemoryRouter>
        <AppHeaderMenu items={mockItems} />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByText('Contact'))
    expect(mockNavigate).toHaveBeenCalledWith('/contact')
  })
})
