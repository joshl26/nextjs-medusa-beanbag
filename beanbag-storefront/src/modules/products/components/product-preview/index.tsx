import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { Text } from "@medusajs/ui"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  isFeatured,
}: ProductPreviewType) => (
  <Link href={`/products/${handle}`} className="group">
    <div>
      <Thumbnail thumbnail={thumbnail} size="full" isFeatured={isFeatured} />
      <div>
        <Text>{title}</Text>
        <div>
          {price ? (
            <>
              {price.price_type === "sale" && (
                <Text>{price.original_price}</Text>
              )}
              <Text
              // className={clsx("text-ui-fg-muted", {
              //   "text-ui-fg-interactive": price.price_type === "sale",
              // })}
              >
                {price.calculated_price}
              </Text>
            </>
          ) : (
            <div ></div>
          )}
        </div>
      </div>
    </div>
  </Link>
)

export default ProductPreview
