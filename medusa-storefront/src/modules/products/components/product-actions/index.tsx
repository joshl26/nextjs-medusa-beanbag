import {
  ProductProvider,
  useProductActions,
} from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import React, { useMemo } from "react"

type ProductActionsProps = {
  product: PricedProduct
}

const ProductActionsInner: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <div>
      <div>
        {product.variants.length > 1 && (
          <div>
            {(product.options || []).map((option) => {
              return (
                <div key={option.id}>
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={updateOptions}
                    title={option.title}
                  />
                </div>
              )
            })}
            <Divider />
          </div>
        )}
      </div>

      {selectedPrice ? (
        <div>
          <span
          // className={clsx("text-xl-semi", {
          //   "text-ui-fg-interactive": selectedPrice.price_type === "sale",
          // })}
          >
            {selectedPrice.calculated_price}
          </span>
          {selectedPrice.price_type === "sale" && (
            <>
              <p>
                <span >Original: </span>
                <span >
                  {selectedPrice.original_price}
                </span>
              </p>
              <span >
                -{selectedPrice.percentage_diff}%
              </span>
            </>
          )}
        </div>
      ) : (
        <div></div>
      )}

      <Button
        onClick={addToCart}
        disabled={!inStock || !variant}
        variant="primary"
      >
        {!inStock
          ? "Out of stock"
          : !variant
          ? "Select variant"
          : "Add to cart"}
      </Button>
    </div>
  )
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => (
  <ProductProvider product={product}>
    <ProductActionsInner product={product} />
  </ProductProvider>
)

export default ProductActions
