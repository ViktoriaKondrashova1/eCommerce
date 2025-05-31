import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { Addresses } from '@/components/Profile/ui/addresses/Addresses'

vi.mock('@/entities/customer/model/customer.store', () => ({
  customerStore: {
    customer: {
      version: 1,
      addresses: [
        {
          id: '1',
          type: 'shipping',
          city: 'Minsk',
          postalCode: '220000',
          streetName: 'Lenina',
          country: 'BY',
          isPrimary: true,
        },
        {
          id: '2',
          type: 'billing',
          city: 'Grodno',
          postalCode: '230000',
          streetName: 'Sovetskaya',
          country: 'BY',
          isPrimary: false,
        },
      ],
    },
    setCustomer: vi.fn(),
  },
}))

vi.mock('@/components/Profile/ui/addresses/use-addresses', () => ({
  useAddresses: () => [
    {
      id: '1',
      type: 'shipping',
      city: 'Minsk',
      postalCode: '220000',
      streetName: 'Lenina',
      country: 'BY',
      isPrimary: true,
    },
    {
      id: '2',
      type: 'billing',
      city: 'Grodno',
      postalCode: '230000',
      streetName: 'Sovetskaya',
      country: 'BY',
      isPrimary: false,
    },
  ],
}))

vi.mock('@/shared/hooks/use-notify', () => ({
  useNotify: () => ({
    showErrorNotify: vi.fn(),
    showSuccessNotify: vi.fn(),
  }),
}))

vi.mock('@/components/Profile/model/lib.ts', () => ({
  getCountry: (code: string) => (code === 'BY' ? 'Belarus' : ''),
}))

vi.mock('@/components/Profile/model/service', () => ({
  profileService: {
    updateAddress: vi.fn(),
    addAddress: vi.fn(),
    addAddressIdByType: vi.fn(),
    removeAddressIdByType: vi.fn(),
    removeAddress: vi.fn(),
  },
}))

vi.mock('@/components/Profile/model/adapter.ts', () => ({
  profileAdapter: {
    exportUpdateAddress: vi.fn(),
    exportAddAddress: vi.fn(),
  },
}))

describe('addresses component', () => {
  it('renders correctly with addresses', () => {
    render(
      <MemoryRouter>
        <Addresses />
      </MemoryRouter>,
    )

    expect(screen.getByText('My Addresses')).toBeInTheDocument()

    const addButtonIcon = screen.getByLabelText('plus')
    expect(addButtonIcon).toBeInTheDocument()
    expect(addButtonIcon.closest('button')).toBeInTheDocument()

    expect(screen.getByText('Shipping Address')).toBeInTheDocument()
    expect(screen.getByText('Billing Address')).toBeInTheDocument()

    expect(screen.getByText('Lenina st.')).toBeInTheDocument()
    expect(screen.getByText('Sovetskaya st.')).toBeInTheDocument()

    expect(screen.getByText('Minsk, 220000')).toBeInTheDocument()
    expect(screen.getByText('Grodno, 230000')).toBeInTheDocument()

    const countryElements = screen.getAllByText('Belarus')
    expect(countryElements.length).toBe(2)
    countryElements.forEach((element) => {
      expect(element).toBeInTheDocument()
    })

    expect(screen.getByText('Default')).toBeInTheDocument()

    const editButtons = screen.getAllByText('Edit')
    expect(editButtons.length).toBe(2)

    const deleteButtons = screen.getAllByText('Delete')
    expect(deleteButtons.length).toBe(2)

    expect(screen.queryByText('Add New Address')).not.toBeInTheDocument()
    expect(screen.queryByText('Edit Address')).not.toBeInTheDocument()
    expect(screen.queryByText('Address Type')).not.toBeInTheDocument()
    expect(screen.queryByText('Country')).not.toBeInTheDocument()
    expect(screen.queryByText('City')).not.toBeInTheDocument()
  })
})
