import type { StateSecurity } from '@/modules/Profile/model/types.ts'
import { render, screen } from '@testing-library/react'
import { Form } from 'antd'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { SecurityForm } from '@/modules/Profile/ui/security/SecurityForm.tsx'

const mockData: StateSecurity = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

describe('securityForm - Rendering', () => {
  const Wrapper: React.FC = () => {
    const [form] = Form.useForm<StateSecurity>()
    return (
      <SecurityForm
        data={mockData}
        onChange={() => {}}
        controller={form}
      />
    )
  }

  it('should render form with correct title', () => {
    render(
      <MemoryRouter>
        <Wrapper />
      </MemoryRouter>,
    )

    expect(screen.getByText('Current Password')).toBeInTheDocument()
    expect(screen.getByText('New Password')).toBeInTheDocument()
    expect(screen.getByText('Confirm New Password')).toBeInTheDocument()
  })

  it('should render all password input fields', () => {
    render(
      <MemoryRouter>
        <Wrapper />
      </MemoryRouter>,
    )

    expect(screen.getByPlaceholderText('Enter current password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter new password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm new password')).toBeInTheDocument()
  })

  it('should render all inputs', () => {
    render(
      <MemoryRouter>
        <Wrapper />
      </MemoryRouter>,
    )
  })
})
