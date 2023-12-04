"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import { ProductCollection } from "@medusajs/medusa"
import ProductPreview from "@modules/products/components/product-preview"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

const ProductRail = ({ collection }: { collection: ProductCollection }) => {
  const { data } = useFeaturedProductsQuery(collection.id)

  return (
    <div>
      <div>
        <div>
          <Text>{collection.title}</Text>
          <InteractiveLink href={`/collections/${collection.handle}`}>
            View all
          </InteractiveLink>
        </div>
        <ul>
          {data &&
            data.map((product) => (
              <li key={product.id}>
                <ProductPreview isFeatured {...product} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default ProductRail
