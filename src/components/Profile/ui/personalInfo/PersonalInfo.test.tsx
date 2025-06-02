import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PersonalInfo } from '@/components/Profile/ui/personalInfo/PersonalInfo'

vi.mock('@/entities/customer/model/customer.store', () => ({
  customerStore: {
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      email: 'john.doe@example.com',
      version: 1,
    },
    setCustomer: vi.fn(),
  },
}))

vi.mock('@/entities/global/model/global.store', () => ({
  globalStore: {
    loading: false,
    setLoading: vi.fn(),
  },
}))

vi.mock('@/shared/hooks/use-notify', () => ({
  useNotify: () => ({
    showErrorNotify: vi.fn(),
  }),
}))

describe('personalInfo component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly in view mode with customer data', () => {
    render(
      <MemoryRouter>
        <PersonalInfo />
      </MemoryRouter>,
    )

    const nameElement = screen.getByTestId('title')
    expect(nameElement).toHaveTextContent('John')
    expect(nameElement).toHaveTextContent('Doe')

    const emailElement = screen.getByText('john.doe@example.com')
    expect(emailElement).toBeInTheDocument()

    expect(screen.getByLabelText('mail')).toBeInTheDocument()

    const dobElement = screen.getByText('1990-01-01')
    expect(dobElement).toBeInTheDocument()

    expect(screen.getByLabelText('calendar')).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: /edit profile/i })
    expect(editButton).toBeInTheDocument()
    expect(editButton).toContainElement(screen.getByLabelText('edit'))
  })
})
