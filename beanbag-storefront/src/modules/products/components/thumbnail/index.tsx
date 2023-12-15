import { Image as MedusaImage } from "@medusajs/medusa"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
// import clsx from "clsx"
import Image from "next/image"
import React from "react"
import styles from "./thumbnail.module.css"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: MedusaImage[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    // <Container
    //   className={clsx(className, {
    //     "aspect-[11/14]": isFeatured,
    //     "aspect-[9/16]": !isFeatured && size !== "square",
    //     "aspect-[1/1]": size === "square",
    //     "w-[180px]": size === "small",
    //     "w-[290px]": size === "medium",
    //     "w-[440px]": size === "large",
    //     "w-full": size === "full",
    //   })}
    // >
    <ImageOrPlaceholder image={initialImage} size={size} />
    // </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={image}
        alt={image}
        quality={25}
        width={0}
        height={0}
        layout="responsive"
        objectFit="contain"
        // sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
        // fill
      />
    </div>
  ) : (
    <div>
      {/* <PlaceholderImage size={size === "small" ? 16 : 24} /> */}
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
