import type { BaseComponent } from '@/shared/types/common.types'
import type { Image as ImageType } from '@commercetools/platform-sdk'
import type { FC } from 'react'
import { Carousel, Image } from 'antd'
import './ProductImageGallery.scss'

interface Props extends BaseComponent {
  images?: ImageType[]
  title: string
}

export const ProductImageGallery: FC<Props> = ({ testId = 'product-image-gallery', images, title }) => {
  if (!images || images.length === 0) {
    return (<div data-testid={`${testId}-empty`}>No images available</div>)
  }

  return (
    <div data-testid={testId} className="product-image-gallery">
      <Image.PreviewGroup items={images.map(img => img.url)}>
        <Carousel
          arrows
          infinite={true}
          autoplay
          autoplaySpeed={8000}
          fade
        >
          {images.map((image, index) => (
            <div key={image.url}>
              <Image
                src={image.url}
                alt={`${title} - ${index + 1}`}
                data-testid={`${testId}-image-${index}`}
              />
            </div>
          ))}
        </Carousel>
      </Image.PreviewGroup>
    </div>
  )
}
