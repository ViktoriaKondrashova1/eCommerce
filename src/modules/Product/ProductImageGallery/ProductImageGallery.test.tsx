import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductImageGallery } from './ProductImageGallery.tsx'

describe('productImageGallery', () => {
  const mockImages = [
    { url: 'image1.jpg', dimensions: { w: 800, h: 600 } },
    { url: 'image2.jpg', dimensions: { w: 800, h: 600 } },
  ]

  it('should render gallery container with testId', () => {
    render(<ProductImageGallery images={mockImages} title="Test Product" />)

    const gallery = screen.getAllByTestId('product-image-gallery')[0]
    expect(gallery).toBeInTheDocument()
  })

  it('should render "No images available" with testId when no images', () => {
    render(<ProductImageGallery images={[]} title="Test Product" />)

    expect(screen.getByTestId('product-image-gallery-empty')).toBeInTheDocument()
    expect(screen.getByText('No images available')).toBeInTheDocument()
  })

  it('should render carousel with testId when images exist', () => {
    render(<ProductImageGallery images={mockImages} title="Test Product" />)

    const carousel = document.querySelector('.ant-carousel')
    expect(carousel).toBeInTheDocument()
  })

  it('should render all images with correct testIds', () => {
    render(<ProductImageGallery images={mockImages} title="Test Product" />)

    mockImages.forEach((_, index) => {
      expect(screen.getByTestId(`product-image-gallery-image-${index}`)).toBeInTheDocument()
    })
  })

  it('should allow custom testId prefix', () => {
    render(
      <ProductImageGallery
        images={mockImages}
        title="Test Product"
        testId="custom-gallery"
      />,
    )

    expect(screen.getByTestId('custom-gallery')).toBeInTheDocument()
  })
})
