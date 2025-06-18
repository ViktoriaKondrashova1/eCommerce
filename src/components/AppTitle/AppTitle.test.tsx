import { render, screen } from '@testing-library/react'
import { AppTitle } from './AppTitle'

describe('appTitle positive', () => {
  it('should render the title with the correct text', () => {
    render(<AppTitle>Test Title</AppTitle>)

    const title = screen.getByTestId('title')

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Test Title')
  })

  it('should render the title with the correct level', () => {
    render(<AppTitle level={2}>Test Title</AppTitle>)

    const title = screen.getByTestId('title')

    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe('H2')
  })
})
