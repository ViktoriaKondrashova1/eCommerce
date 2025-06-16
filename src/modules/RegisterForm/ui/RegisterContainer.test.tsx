import { render, screen } from '@testing-library/react'
import { Steps } from 'antd'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

describe('appRegistration Steps Navigation', () => {
  const steps = [
    { title: 'Info', content: <div>Personal Info</div> },
    { title: 'Shipping', content: <div>Shipping Info</div> },
    { title: 'Billing', content: <div>Billing Info</div> },
    { title: 'Finish', content: <div>Finish</div> },
  ]

  it('should render all steps', () => {
    render(
      <MemoryRouter>
        <Steps
          current={0}
          items={steps}
          data-testid="registration-steps"
        />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('registration-steps')).toBeInTheDocument()
    expect(screen.getByText('Info')).toBeInTheDocument()
    expect(screen.getByText('Shipping')).toBeInTheDocument()
    expect(screen.getByText('Billing')).toBeInTheDocument()
    expect(screen.getByText('Finish')).toBeInTheDocument()
  })
})
