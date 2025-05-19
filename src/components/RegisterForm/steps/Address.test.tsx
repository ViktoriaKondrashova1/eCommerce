import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from 'antd'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { RegisterFormProvider } from '@/components/RegisterForm/model/registration-form-context'
import { AddressFields } from './Addresses'

describe('appAddressFields positive', () => {
  const mockAddress = {
    id: '1',
    country: '',
    city: '',
    postalCode: '',
    streetName: '',
    custom: {
      fields: {
        isPrimary: false,
      },
    },
  }

  const mockHandlers = {
    onUpdate: vi.fn(),
    onSetPrimary: vi.fn(),
    onDelete: vi.fn(),
  }

  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const [form] = Form.useForm()
    return (
      <RegisterFormProvider form={form}>
        {children}
      </RegisterFormProvider>
    )
  }

  it('should render address card with all fields', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <AddressFields
            address={mockAddress}
            index={0}
            isPrimary={false}
            {...mockHandlers}
          />
        </TestWrapper>
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('Country')).toBeInTheDocument()
    expect(screen.getByLabelText('City')).toBeInTheDocument()
    expect(screen.getByLabelText('Postal code')).toBeInTheDocument()
    expect(screen.getByLabelText('Street')).toBeInTheDocument()
  })

  it('should call onUpdate when fields change', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <AddressFields
            address={mockAddress}
            index={0}
            isPrimary={false}
            {...mockHandlers}
          />
        </TestWrapper>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Minsk' } })
    expect(mockHandlers.onUpdate).toHaveBeenCalledWith('city', 'Minsk')
  })

  it('should call onSetPrimary when button clicked', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <AddressFields
            address={mockAddress}
            index={0}
            isPrimary={false}
            {...mockHandlers}
          />
        </TestWrapper>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByText('Set as default'))
    expect(mockHandlers.onSetPrimary).toHaveBeenCalled()
  })
})
