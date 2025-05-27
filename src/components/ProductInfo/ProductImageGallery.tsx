import type { Image as ImageType } from '@commercetools/platform-sdk'
import type { FC } from 'react'
import { Carousel, Image } from 'antd'

interface Props {
  images?: ImageType[]
  title: string
}

export const ProductImageGallery: FC<Props> = ({ images, title }) => {
  if (!images || images.length === 0) {
    return (<div>No images available</div>)
  }

  return (
    <Image.PreviewGroup items={images.map(img => img.url)}>
      <Carousel
        arrows
        infinite={true}
        autoplay
        autoplaySpeed={8000}
        fade
        style={{ width: '80%', margin: '0 auto' }}
      >
        {images.map((image, index) => (
          <div key={image.url}>
            <Image
              src={image.url}
              alt={`${title} - ${index + 1}`}
              style={{
                borderRadius: 8,
                width: '100%',
              }}
            />
          </div>
        ))}
      </Carousel>
    </Image.PreviewGroup>
  )
}
