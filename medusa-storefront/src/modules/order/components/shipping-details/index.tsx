import { Order } from "@medusajs/medusa"
import { Heading, Text } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import { formatAmount } from "medusa-react"

type ShippingDetailsProps = {
  order: Order
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <Heading level="h2">Delivery</Heading>
      <div>
        <div>
          <Text>Shipping Address</Text>
          <Text>
            {order.shipping_address.first_name}{" "}
            {order.shipping_address.last_name}
          </Text>
          <Text>
            {order.shipping_address.address_1}{" "}
            {order.shipping_address.address_2}
          </Text>
          <Text>
            {order.shipping_address.postal_code}, {order.shipping_address.city}
          </Text>
          <Text>{order.shipping_address.country_code?.toUpperCase()}</Text>
        </div>
        <div>
          <Text>Contact</Text>
          <Text>{order.shipping_address.phone}</Text>
          <Text>{order.email}</Text>
        </div>

        <div>
          <Text>Method</Text>
          <Text>
            {order.shipping_methods[0].shipping_option.name} (
            {formatAmount({
              amount: order.shipping_methods[0].price,
              region: order.region,
            })
              .replace(/,/g, "")
              .replace(/\./g, ",")}
            )
          </Text>
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default ShippingDetails
