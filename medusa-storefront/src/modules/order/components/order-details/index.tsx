import { Order } from "@medusajs/medusa"
import { Heading, Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const items = order.items.reduce((acc, i) => acc + i.quantity, 0)

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Text>
        We have sent the order confirmation details to{" "}
        <span>{order.email}</span>.
      </Text>
      <Text>Order date: {new Date(order.created_at).toDateString()}</Text>
      <Text>Order number: {order.display_id}</Text>

      <div>
        {showStatus && (
          <>
            <Text>
              Order status:{" "}
              <span>{formatStatus(order.fulfillment_status)}</span>
            </Text>
            <Text>
              Payment status: <span>{formatStatus(order.payment_status)}</span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
