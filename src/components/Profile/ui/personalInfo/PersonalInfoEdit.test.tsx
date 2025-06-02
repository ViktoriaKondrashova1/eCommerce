import type { ChangeEvent } from 'react'
import type { StatePersonalInfo } from '@/components/Profile/model/types.ts'
import { render, screen } from '@testing-library/react'
import { Form } from 'antd'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { PersonalInfoEdit } from '@/components/Profile/ui/personalInfo/PersonalInfoEdit'

vi.mock('@/components/AppInput/AppInput.tsx', () => ({
  AppInput: ({ onChange, value }: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value?: string
  }) => (
    <input
      data-testid="app-input"
      onChange={onChange}
      value={value ?? ''}
    />
  ),
}))

vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('antd')>()
  return {
    ...actual,
    DatePicker: ({ onChange, value }: {
      onChange: (date: unknown) => void
      value?: unknown
    }) => (
      <input
        data-testid="date-picker"
        onChange={e => onChange(e.target.value)}
        value={value !== null && value !== undefined ? 'mocked-date' : ''}
      />
    ),
  }
})

describe('personalInfoEdit component', () => {
  const mockData: StatePersonalInfo = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    email: 'john.doe@example.com',
  }

  const mockOnChange = vi.fn()

  const TestWrapper = ({ data }: { data: StatePersonalInfo }) => {
    const [form] = Form.useForm<StatePersonalInfo>()
    return (
      <MemoryRouter>
        <PersonalInfoEdit
          data={data}
          onChange={mockOnChange}
          controller={form}
        />
      </MemoryRouter>
    )
  }

  it('renders all form fields with correct labels', () => {
    render(<TestWrapper data={mockData} />)

    expect(screen.getByText('First name')).toBeInTheDocument()
    expect(screen.getByText('Last name')).toBeInTheDocument()
    expect(screen.getByText('Date of birth')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders with initial values from data prop', () => {
    render(<TestWrapper data={mockData} />)

    const inputs = screen.getAllByTestId('app-input')
    const firstNameInput = inputs[0] as HTMLInputElement
    const lastNameInput = inputs[1] as HTMLInputElement
    const emailInput = inputs[2] as HTMLInputElement

    expect(firstNameInput.value).toBe('John')
    expect(lastNameInput.value).toBe('Doe')
    expect(emailInput.value).toBe('john.doe@example.com')
  })

  it('renders DatePicker field with test value', () => {
    render(<TestWrapper data={mockData} />)
    const datePicker: HTMLInputElement = screen.getByTestId('date-picker')
    expect(datePicker.value).toBe('mocked-date')
  })
})
