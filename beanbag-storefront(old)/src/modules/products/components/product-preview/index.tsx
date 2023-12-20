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
      <div>
        <Thumbnail thumbnail={thumbnail} size="small" isFeatured={isFeatured} />
      </div>
      <div className="spacer_small"></div>
      <div>
        <p className="title">{title}</p>
        <div>
          {price ? (
            <>
              <div className="spacer_small"></div>
              {price.price_type === "sale" && <p>{price.original_price}</p>}
              <p
              // className={clsx("text-ui-fg-muted", {
              //   "text-ui-fg-interactive": price.price_type === "sale",
              // })}
              >
                from {price.calculated_price}
              </p>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="spacer_small"></div>
    </div>
  </Link>
)

export default ProductPreview
