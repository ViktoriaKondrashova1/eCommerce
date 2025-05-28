import type { Image as ImageType } from '@commercetools/platform-sdk'
import type { FC } from 'react'
import { Carousel, Image } from 'antd'
import './ProductImageGallery.scss'

interface Props {
  images?: ImageType[]
  title: string
}

export const ProductImageGallery: FC<Props> = ({ images, title }) => {
  if (!images || images.length === 0) {
    return (<div>No images available</div>)
  }

  return (
    <div className="product-image-gallery">
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
              />
            </div>
          ))}
        </Carousel>
      </Image.PreviewGroup>
    </div>
  )
}
