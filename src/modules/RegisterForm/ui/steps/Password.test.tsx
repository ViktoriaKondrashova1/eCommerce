import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Passwords } from './Password.tsx'

describe('appPasswords positive', () => {
  it('should render the card passwords and name of fields', () => {
    render(<MemoryRouter><Passwords /></MemoryRouter>)

    const passwords = screen.getByTestId('cardPassword')

    expect(passwords).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByText('Confirm password')).toBeInTheDocument()
  })

  it('should have cardPassword className', () => {
    render(<MemoryRouter><Passwords /></MemoryRouter>)
    const passwordsCard = screen.getByTestId('cardPassword')
    expect(passwordsCard).toHaveClass('cardPassword')
  })

  it('should have placeholder for password field', () => {
    render(<MemoryRouter><Passwords /></MemoryRouter>)
    const passwordInput = screen.getByPlaceholderText('Password')
    expect(passwordInput).toBeInTheDocument()
  })

  it('should have placeholder for confirm password field', () => {
    render(<MemoryRouter><Passwords /></MemoryRouter>)
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password')
    expect(confirmPasswordInput).toBeInTheDocument()
  })
})
