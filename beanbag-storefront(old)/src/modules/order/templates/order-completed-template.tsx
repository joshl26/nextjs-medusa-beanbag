"use client"

import { Order } from "@medusajs/medusa"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import React, { useEffect, useState } from "react"
import Divider from "@modules/common/components/divider"
import CartTotals from "@modules/common/components/cart-totals"
import { Heading } from "@medusajs/ui"
import PaymentDetails from "../components/payment-details"

type OrderCompletedTemplateProps = {
  order: Order
}

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false)

  useEffect(() => {
    const onboarding = window.sessionStorage.getItem("onboarding")
    setIsOnboarding(onboarding === "true")
  }, [])

  return (
    <div>
      <div>
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div>
          <Heading level="h1">
            <span>Thank you!</span>
            <span>Your order was placed successfully.</span>
          </Heading>
          <OrderDetails order={order} />
          <Heading level="h2">Summary</Heading>
          <Items
            items={order.items}
            region={order.region}
            cartId={order.cart_id}
          />
          <CartTotals data={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  )
}

export default OrderCompletedTemplate
