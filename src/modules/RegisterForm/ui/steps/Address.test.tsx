import type { AddressWithCustomFields } from '@/modules/RegisterForm/model/form-store.ts'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { Form } from 'antd'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { RegisterFormProvider } from '@/modules/RegisterForm/model/registration-form-context.tsx'
import { AddressFields } from './Addresses.tsx'

describe('appAddressFields positive', () => {
  const mockAddress = {
    id: '1',
    country: '',
    city: '',
    postalCode: '',
    streetName: '',
    custom: {
      type: {
        key: 'address-custom-field',
      },
      fields: {
        isPrimary: false,
      },
    },
  } satisfies AddressWithCustomFields

  const mockHandlers = {
    onUpdate: vi.fn(),
    onSetPrimary: vi.fn(),
    onDelete: vi.fn(),
    onSetDefault: vi.fn(),
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
            isDefault={false}
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
            isDefault={false}
            {...mockHandlers}
          />
        </TestWrapper>
      </MemoryRouter>,
    )

    act(() => {
      fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Minsk' } })
    })
    expect(mockHandlers.onUpdate).toHaveBeenCalledWith('city', 'Minsk')
  })
})
