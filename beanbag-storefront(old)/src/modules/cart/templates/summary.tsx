import { Cart } from "@medusajs/medusa"
import { Button, Heading } from "@medusajs/ui"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import RoundButton from "@modules/common/components/round-button"
import Link from "next/link"
import styles from "./summary.module.css"

type SummaryProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Summary</h2>
      <div className="spacer_small"></div>
      <DiscountCode cart={cart} />
      <div className="spacer_small"></div>
      <div className="spacer_small"></div>
      <div className="divider"></div>
      <CartTotals data={cart} />
      <div className="spacer_small"></div>
      <Link style={{ display: "flex" }} href="/checkout">
        <RoundButton
          className={styles.button_style}
          href=""
          buttonText="Go to checkout"
        />
      </Link>
    </div>
  )
}

export default Summary
