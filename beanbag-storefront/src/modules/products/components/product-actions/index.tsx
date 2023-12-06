import {
  ProductProvider,
  useProductActions,
} from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import RoundButton from "@modules/common/components/round-button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import React, { useMemo } from "react"
import DrinkSizeOptionSelect from "../drink-size-option-select"
import styles from "./product-actions.module.css"

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
    <section style={{ height: "40vh" }}>
      <div className="spacer"></div>
      <div>
        {product.variants.length > 1 &&
        product.collection?.title === "Hot Coffees" ? (
          <div>
            {(product.options || []).map((option) => {
              return (
                <div key={option.id}>
                  <DrinkSizeOptionSelect
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
        ) : (
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
      <div className="spacer_small"></div>
      {selectedPrice ? (
        <div>
          <span
          // className={clsx("text-xl-semi", {
          //   "text-ui-fg-interactive": selectedPrice.price_type === "sale",
          // })}
          >
            Option Price: {selectedPrice.calculated_price}
          </span>
          {selectedPrice.price_type === "sale" && (
            <>
              <p>
                <span>Original: </span>
                <span>{selectedPrice.original_price}</span>
              </p>
              <span>-{selectedPrice.percentage_diff}%</span>
            </>
          )}
        </div>
      ) : (
        <div></div>
      )}

      <div
        style={{
          position: "fixed",
          right: "50px",
          top: "70vh",
          height: "50px",
        }}
      >
        <Button
          onClick={addToCart}
          disabled={!inStock || !variant}
          variant="danger"
        >
          {/* <RoundButton
            className={styles.button}
            href=""
            buttonText=
          /> */}
          {!inStock
            ? "Out of stock"
            : !variant
            ? "Select variant"
            : "Add to Order"}
        </Button>
      </div>

      <div className="spacer"></div>
    </section>
  )
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => (
  <ProductProvider product={product}>
    <ProductActionsInner product={product} />
  </ProductProvider>
)

export default ProductActions
