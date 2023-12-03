import { Order } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount } from "medusa-react"
import Link from "next/link"
import { useMemo } from "react"

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items.length
  }, [order])

  return (
    <div>
      <div>#{order.display_id}</div>
      <div>
        <span>{new Date(order.created_at).toDateString()}</span>
        <span>
          {formatAmount({
            amount: order.total,
            region: order.region,
            includeTaxes: false,
          })}
        </span>
        <span>{`${numberOfLines} ${
          numberOfLines > 1 ? "items" : "item"
        }`}</span>
      </div>
      <div>
        {order.items.slice(0, 3).map((i) => {
          return (
            <div key={i.id}>
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              <div>
                <span>{i.title}</span>
                <span>x</span>
                <span>{i.quantity}</span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 4 && (
          <div>
            <span>+ {numberOfLines - 4}</span>
            <span>more</span>
          </div>
        )}
      </div>
      <div>
        <Link href={`/order/details/${order.id}`}>
          <Button variant="secondary">See details</Button>
        </Link>
      </div>
    </div>
  )
}

export default OrderCard
