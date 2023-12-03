import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Heading, Text } from "@medusajs/ui"
import Link from "next/link"
import React from "react"

type ProductInfoProps = {
  product: PricedProduct
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div id="product-info">
      <div>
        {product.collection && (
          <Link href={`/collections/${product.collection.handle}`}>
            {product.collection.title}
          </Link>
        )}
        <Heading level="h2">{product.title}</Heading>

        <Text>{product.description}</Text>
      </div>
    </div>
  )
}

export default ProductInfo
