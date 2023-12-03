"use client"

import { Button } from "@medusajs/ui"
import Spinner from "@modules/common/icons/spinner"
import { useCustomerOrders } from "medusa-react"
import Link from "next/link"
import OrderCard from "../order-card"

const OrderOverview = () => {
  const { orders, isLoading } = useCustomerOrders()

  if (isLoading) {
    return (
      <div >
        <Spinner size={36} />
      </div>
    )
  }

  if (orders?.length) {
    return (
      <div >
        {orders.map((o) => (
          <div
            key={o.id}
            
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div >
      <h2 >Nothing to see here</h2>
      <p >
        You don&apos;t have any orders yet, let us change that {":)"}
      </p>
      <div >
        <Link href="/" passHref>
          <Button>Continue shopping</Button>
        </Link>
      </div>
    </div>
  )
}

export default OrderOverview
