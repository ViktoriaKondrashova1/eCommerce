import { appMoto, appName } from '@/shared/constants'
import { render, screen } from '@testing-library/react'
import { Grid } from 'antd'
import { vi } from 'vitest'
import { HeroSection } from './HeroSection'

vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('antd')>()
  return {
    ...actual,
    Grid: {
      useBreakpoint: vi.fn(() => ({
        xs: true,
        sm: true,
        md: true,
        lg: true,
      })),
    },
  }
})

describe('heroSection', () => {
  it('should render the hero section container', () => {
    render(<HeroSection />)

    const container = screen.getByTestId('hero-section')

    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('hero-section')
  })

  it('should display the app name as title', () => {
    render(<HeroSection />)

    expect(screen.getByText(appName)).toBeInTheDocument()
  })

  it('should display the app moto as text', () => {
    render(<HeroSection />)

    expect(screen.getByText(appMoto)).toBeInTheDocument()
  })

  it('should render title with level 2 on small screens', () => {
    vi.mocked(Grid.useBreakpoint).mockReturnValue({ xs: true, sm: false, md: false, lg: false })

    render(<HeroSection />)

    const title = screen.getByText(appName)
    expect(title.tagName).toBe('H2')
  })

  it('should render title with level 1 on larger screens', () => {
    vi.mocked(Grid.useBreakpoint).mockReturnValue({ xs: false, sm: true, md: true, lg: true })

    render(<HeroSection />)

    const title = screen.getByText(appName)
    expect(title.tagName).toBe('H1')
  })
})
