// import { promocode, promocodeText } from '@/shared/constants'
// import { render, screen } from '@testing-library/react'
// import { Grid } from 'antd'
// import { vi } from 'vitest'
// import { PromocodeSection } from './PromocodeSection'

// vi.mock('antd', async (importOriginal) => {
//   const actual = await importOriginal<typeof import('antd')>()
//   return {
//     ...actual,
//     App: {
//       // eslint-disable-next-line react-hooks-extra/no-unnecessary-use-prefix
//       useApp: () => ({
//         message: {
//           success: vi.fn(),
//         },
//       }),
//     },
//     Grid: {
//       useBreakpoint: vi.fn(),
//     },
//   }
// })

// beforeEach(() => {
//   Object.defineProperty(navigator, 'clipboard', {
//     value: {
//       writeText: vi.fn(async () => Promise.resolve()),
//     },
//     writable: true,
//   })
// })

// afterEach(() => {
//   vi.restoreAllMocks()
// })

// describe('promocodeSection', () => {
//   const setup = (breakpoints = { md: true }) => {
//     vi.mocked(Grid.useBreakpoint).mockReturnValue(breakpoints)
//     return render(<PromocodeSection />)
//   }

//   it('should render correctly with default props', () => {
//     setup()

//     const promocodeSection = screen.getByTestId('promocode')

//     expect(promocodeSection).toBeInTheDocument()
//     expect(screen.getByText(promocodeText)).toBeInTheDocument()
//     expect(screen.getByText(promocode)).toBeInTheDocument()
//     expect(screen.getByRole('button', { name: 'Copy Code' })).toBeInTheDocument()
//   })

//   it('should copy promocode to clipboard on button click', async () => {
//     const writeTextMock = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

//     setup()

//     const button = screen.getByRole('button', { name: 'Copy Code' })
//     fireEvent.click(button)

//     await waitFor(() => {
//       expect(writeTextMock).toHaveBeenCalledWith(promocode)
//       expect(writeTextMock).toHaveBeenCalledTimes(1)
//       expect(AntApp.useApp().message.success).toHaveBeenCalledWith('Promocode has been copied!')
//     })

//     writeTextMock.mockRestore()
//   })

//   describe('responsive layout', () => {
//     it('renders vertical layout on mobile', () => {
//       setup({ md: false })

//       const flexContainer = screen.getByTestId('promocode').querySelector('.ant-flex')
//       expect(flexContainer).toHaveClass('ant-flex-vertical')
//     })

//     it('renders horizontal layout on desktop', () => {
//       setup({ md: true })

//       const flexContainer = screen.getByTestId('promocode').querySelector('.ant-flex')
//       expect(flexContainer).not.toHaveClass('ant-flex-vertical')
//     })
//   })
// })
