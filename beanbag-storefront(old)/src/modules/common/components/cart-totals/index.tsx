import { Cart, Order } from "@medusajs/medusa"
import { Tooltip } from "@medusajs/ui"
import { InformationCircleSolid } from "@medusajs/icons"
import { formatAmount } from "medusa-react"
import React from "react"
import styles from "./cart-totals.module.css"

type CartTotalsProps = {
  data: Omit<Cart, "refundable_amount" | "refunded_total"> | Order
}

const CartTotals: React.FC<CartTotalsProps> = ({ data }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = data

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: data.region,
      includeTaxes: false,
    })
  }

  return (
    <div className={styles.container}>
      <>
        <div className={styles.flex_row}>
          <span className={styles.subtotal}>
            Subtotal
            <Tooltip
              className={styles.tooltip}
              content="Cart total excluding shipping and taxes."
            >
              <InformationCircleSolid color="black" />
            </Tooltip>
          </span>
          <span className={styles.subtotal_total}>{getAmount(subtotal)}</span>
        </div>
        <div className="spacer_small"></div>
        {!!discount_total && (
          <>
            <div className={styles.flex_row}>
              <span className={styles.discount}>Discount</span>
              <span className={styles.discount_total}>
                - {getAmount(discount_total)}
              </span>
            </div>
            <div className="spacer_small"></div>
          </>
        )}

        {!!gift_card_total && (
          <>
            <div className={styles.flex_row}>
              <span className={styles.giftcard}>Gift card</span>
              <span className={styles.giftcard_total}>
                - {getAmount(gift_card_total)}
              </span>
            </div>
            <div className="spacer_small"></div>
          </>
        )}
        <>
          <div className={styles.flex_row}>
            <span className={styles.shipping}>Shipping</span>
            <span className={styles.shipping_total}>
              {getAmount(shipping_total)}
            </span>
          </div>
          <div className="spacer_small"></div>
        </>

        <>
          <div className={styles.flex_row}>
            <span className={styles.tax}>Taxes</span>
            <span className={styles.tax_total}>{getAmount(tax_total)}</span>
          </div>{" "}
          <div className="spacer_small"></div>
        </>
      </>
      <div />
      <div className={styles.flex_row}>
        <span className={styles.total}>Total</span>
        <span className={styles.total_total}>{getAmount(total)}</span>
      </div>
      <div />
    </div>
  )
}

export default CartTotals
