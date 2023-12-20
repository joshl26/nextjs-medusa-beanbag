import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <>
      {images.map((image, index) => {
        return (
          <Container key={image.id} id={image.id}>
            <Image
              src={image.url}
              priority={index <= 2 ? true : false}
              alt={`Product image ${index + 1}`}
              width={2400}
              height={1598}
              layout="responsive"
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            />
          </Container>
        )
      })}
    </>
  )
}

export default ImageGallery
