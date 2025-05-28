import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppSkeleton } from './AppSkeleton'
import '@testing-library/jest-dom'

describe('appSkeleton', () => {
  it('should render with default props', () => {
    render(<AppSkeleton />)

    const backdrop = screen.getByTestId('skeleton')
    expect(backdrop).toBeInTheDocument()

    expect(backdrop).toHaveStyle('padding: 16px 0')
    expect(backdrop).toHaveStyle('width: 100%')
  })

  it('should render with correct Skeleton structure', () => {
    const { container } = render(<AppSkeleton />)

    const skeletonElements = container.querySelectorAll('.ant-skeleton')
    expect(skeletonElements.length).toBe(5)

    skeletonElements.forEach((element) => {
      expect(element).toHaveClass('ant-skeleton-active')
    })
  })
})
