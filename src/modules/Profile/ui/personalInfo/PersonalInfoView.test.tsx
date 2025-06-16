import type { StatePersonalInfo } from '@/modules/Profile/model/types.ts'
import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PersonalInfoView } from '@/modules/Profile/ui/personalInfo/PersonalInfoView.tsx'

describe('personalInfoView component', () => {
  const mockData: StatePersonalInfo = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    email: 'john.doe@example.com',
  }

  it('renders correctly with provided data', () => {
    render(
      <MemoryRouter>
        <PersonalInfoView data={mockData} />
      </MemoryRouter>,
    )

    const fullName = screen.getByRole('heading', { level: 3 })
    expect(fullName).toHaveTextContent('John Doe')

    const emailElement = screen.getByText('john.doe@example.com')
    expect(emailElement).toBeInTheDocument()

    const formattedDate = dayjs(mockData.dateOfBirth).format('YYYY-MM-DD')
    const dobElement = screen.getByText(formattedDate)
    expect(dobElement).toBeInTheDocument()
  })

  it('renders correctly with empty data', () => {
    const emptyData: StatePersonalInfo = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
    }

    render(
      <MemoryRouter>
        <PersonalInfoView data={emptyData} />
      </MemoryRouter>,
    )

    const fullName = screen.getByRole('heading', { level: 3 })
    expect(fullName.textContent).toBe(' ') // Один пробел между пустыми именами

    const emailText = screen.getByLabelText('mail').nextSibling?.textContent
    expect(emailText).toBe(' ')

    const dobText = screen.getByLabelText('calendar').nextSibling?.textContent
    expect(dobText).toBe(' ')
  })
})
