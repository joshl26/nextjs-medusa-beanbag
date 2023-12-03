import { Cart, Order } from "@medusajs/medusa"
import { Tooltip } from "@medusajs/ui"
import { InformationCircleSolid } from "@medusajs/icons"
import { formatAmount } from "medusa-react"
import React from "react"

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
    <div>
      <div>
        <div>
          <span>
            Subtotal
            <Tooltip content="Cart total excluding shipping and taxes.">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip>
          </span>
          <span>{getAmount(subtotal)}</span>
        </div>
        {!!discount_total && (
          <div>
            <span>Discount</span>
            <span>- {getAmount(discount_total)}</span>
          </div>
        )}
        {!!gift_card_total && (
          <div>
            <span>Gift card</span>
            <span>- {getAmount(gift_card_total)}</span>
          </div>
        )}
        <div>
          <span>Shipping</span>
          <span>{getAmount(shipping_total)}</span>
        </div>
        <div>
          <span>Taxes</span>
          <span>{getAmount(tax_total)}</span>
        </div>
      </div>
      <div />
      <div>
        <span>Total</span>
        <span>{getAmount(total)}</span>
      </div>
      <div />
    </div>
  )
}

export default CartTotals
