import { theme } from '@/shared/configs/theme'
import { appName } from '@/shared/constants'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppFooter } from './AppFooter'

describe('appFooter positive', () => {
  it('should render the footer, title and developers list', () => {
    render(<MemoryRouter><AppFooter /></MemoryRouter>)

    const footer = screen.getByTestId('footer')

    expect(footer).toBeInTheDocument()
    expect(screen.getByText(appName)).toBeInTheDocument()
    expect(screen.getByText('Developers:')).toBeInTheDocument()
  })

  it('should render menu items', () => {
    render(<MemoryRouter><AppFooter /></MemoryRouter>)

    const menuItems = ['MAIN', 'ABOUT', 'CATALOG', 'CART']
    menuItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('should have footer className and correct bg color', () => {
    render(<MemoryRouter><AppFooter /></MemoryRouter>)

    const footer = screen.getByTestId('footer')

    expect(footer).toHaveClass('footer')
    expect(footer).toHaveStyle(`background: ${theme.token.colorPrimary}`)
  })

  it('should render developers list with correct links', () => {
    render(<MemoryRouter><AppFooter /></MemoryRouter>)

    const developers = [
      { name: 'lnrzhkv', link: 'https://github.com/lnrzhkv' },
      { name: 'EvgenKham', link: 'https://github.com/EvgenKham' },
      { name: 'ViktoriaKondrashova1', link: 'https://github.com/ViktoriaKondrashova1' },
    ]

    developers.forEach((dev) => {
      const link = screen.getByText(dev.name)
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', dev.link)
      expect(link).toHaveAttribute('target', '_blank')
    })
  })
})
