import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PersonalInfo } from './Info'

describe('appPersonalInfo positive', () => {
  it('should render the card personal info and name of fields', () => {
    render(<MemoryRouter><PersonalInfo /></MemoryRouter>)

    const info = screen.getByTestId('cardInfo')

    expect(info).toBeInTheDocument()
    expect(screen.getByText('First name')).toBeInTheDocument()
    expect(screen.getByText('Last name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Date of birth')).toBeInTheDocument()
  })

  it('should have cardInfo className', () => {
    render(<MemoryRouter><PersonalInfo /></MemoryRouter>)
    const info = screen.getByTestId('cardInfo')
    expect(info).toHaveClass('cardInfo')
  })

  it('should have placeholder for first name field', () => {
    render(<MemoryRouter><PersonalInfo /></MemoryRouter>)
    const firstNameInput = screen.getByPlaceholderText('John')
    expect(firstNameInput).toBeInTheDocument()
  })

  it('should have placeholder for last name field', () => {
    render(<MemoryRouter><PersonalInfo /></MemoryRouter>)
    const lastNameInput = screen.getByPlaceholderText('Wick')
    expect(lastNameInput).toBeInTheDocument()
  })

  it('should have placeholder for email field', () => {
    render(<MemoryRouter><PersonalInfo /></MemoryRouter>)
    const emailInput = screen.getByPlaceholderText('john@gmail.com')
    expect(emailInput).toBeInTheDocument()
  })

  it('should have placeholder for date of birth field', () => {
    render(<MemoryRouter><PersonalInfo /></MemoryRouter>)
    const dateInput = screen.getByPlaceholderText('1964-04-01')
    expect(dateInput).toBeInTheDocument()
  })
})
