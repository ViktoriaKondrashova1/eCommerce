import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { App as AntApp, Grid } from 'antd'
import { vi } from 'vitest'
import { PromocodeSection } from './PromocodeSection'

vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('antd')>()
  const message = {
    success: vi.fn(),
  }
  return {
    ...actual,
    App: {
      useApp: () => ({ message }),
    },
    Grid: {
      useBreakpoint: vi.fn(),
    },
  }
})

const mockPromocode = 'TESTPROMOCODE'
const mockPromocodeText = 'Test promo code text'

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn(async () => Promise.resolve()),
    },
    writable: true,
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('promocodeSection', () => {
  const setup = (breakpoints = { md: true }) => {
    vi.mocked(Grid.useBreakpoint).mockReturnValue(breakpoints)
    return render(<PromocodeSection promocode={mockPromocode} promocodeText={mockPromocodeText} />)
  }

  it('should render correctly with default props', () => {
    setup()

    const promocodeSection = screen.getByTestId('promocode')

    expect(promocodeSection).toBeInTheDocument()
    expect(screen.getByText(mockPromocodeText)).toBeInTheDocument()
    expect(screen.getByText(mockPromocode)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy Code' })).toBeInTheDocument()
  })

  it('should copy promocode to clipboard on button click', async () => {
    const writeTextMock = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

    setup()

    const button = screen.getByRole('button', { name: 'Copy Code' })
    act(() => {
      fireEvent.click(button)
    })

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(mockPromocode)
      expect(writeTextMock).toHaveBeenCalledTimes(1)
      expect(AntApp.useApp().message.success).toHaveBeenCalledWith('Promocode has been copied')
    })

    writeTextMock.mockRestore()
  })

  describe('responsive layout', () => {
    it('renders vertical layout on mobile', () => {
      setup({ md: false })

      const flexContainer = screen.getByTestId('promocode').querySelector('.ant-flex')
      expect(flexContainer).toHaveClass('ant-flex-vertical')
    })

    it('renders horizontal layout on desktop', () => {
      setup({ md: true })

      const flexContainer = screen.getByTestId('promocode').querySelector('.ant-flex')
      expect(flexContainer).not.toHaveClass('ant-flex-vertical')
    })
  })
})
