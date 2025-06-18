import { render, screen } from '@testing-library/react'
import { AppText } from './AppText'

describe('appText positive', () => {
  it('should render correct text', () => {
    render(<AppText>Test Text</AppText>)

    const text = screen.getByTestId('text')

    expect(text).toBeInTheDocument()
    expect(text).toHaveTextContent('Test Text')
  })
})
