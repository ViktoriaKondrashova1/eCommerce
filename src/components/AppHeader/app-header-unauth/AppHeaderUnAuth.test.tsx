import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { appName } from '@/shared/constants'
import { AppHeaderUnAuth } from './AppHeaderUnAuth'

describe('appHeaderUnAuth positive', () => {
  it('should render the header, title and divider', () => {
    render(<MemoryRouter><AppHeaderUnAuth /></MemoryRouter>)

    const header = screen.getByTestId('header')

    expect(header).toBeInTheDocument()
    expect(screen.getByText(appName)).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('should always render constant menu items', () => {
    render(<MemoryRouter><AppHeaderUnAuth /></MemoryRouter>)

    expect(screen.getByText('MAIN')).toBeInTheDocument()
    expect(screen.getByText('ABOUT')).toBeInTheDocument()
    expect(screen.getByText('CATALOG')).toBeInTheDocument()
    expect(screen.getByText('LOG IN')).toBeInTheDocument()
    expect(screen.getByText('SIGN UP')).toBeInTheDocument()
  })

  it('should have header className', () => {
    render(<MemoryRouter><AppHeaderUnAuth /></MemoryRouter>)

    const header = screen.getByTestId('header')

    expect(header).toHaveClass('header')
  })
})
