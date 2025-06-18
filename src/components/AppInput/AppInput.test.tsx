import { render, screen } from '@testing-library/react'
import { AppInput } from './AppInput'

describe('appInput positive', () => {
  it('should render the input with the correct placeholder', () => {
    render(<AppInput placeholder="Placeholder Test" />)

    const input = screen.getByTestId('input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Placeholder Test')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('should apply the correct type class', () => {
    render(<AppInput className="test-className" />)

    const input = screen.getByTestId('input')

    expect(input).toHaveClass('test-className')
  })

  it('should render the input with prefix', () => {
    render(<AppInput prefix={<span data-testid="test-icon">Icon</span>} />)

    const input = screen.getByTestId('input')
    expect(input).toBeInTheDocument()

    const icon = screen.getByTestId('test-icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveTextContent('Icon')
  })

  it('should render the input of password type', () => {
    render(<AppInput isPassword />)

    const input = screen.getByTestId('input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })
})
