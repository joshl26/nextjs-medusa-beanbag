import { Customer, Order } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import { formatAmount } from "medusa-react"
import Link from "next/link"

type OverviewProps = {
  orders?: Order[]
  customer?: Omit<Customer, "password_hash">
}

const Overview = ({ orders, customer }: OverviewProps) => {
  return (
    <div>
      <div>
        <div>Hello {customer?.first_name}</div>
        <div>
          <ul>
            <li>
              <Link href="/account/profile">
                <>
                  <div>
                    <User size={16} />
                    <span>Profile</span>
                  </div>
                  <ChevronDown />
                </>
              </Link>
            </li>
            <li>
              <Link href="/account/addresses">
                <>
                  <div>
                    <MapPin size={16} />
                    <span>Addresses</span>
                  </div>
                  <ChevronDown />
                </>
              </Link>
            </li>
            <li>
              <Link href="/account/orders">
                <>
                  <div>
                    <Package size={16} />
                    <span>Orders</span>
                  </div>
                  <ChevronDown />
                </>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div>
          <span>Hello {customer?.first_name}</span>
          <span>
            Signed in as: <span>{customer?.email}</span>
          </span>
        </div>
        <div>
          <div>
            <div>
              <div>
                <h3>Profile</h3>
                <div>
                  <span>{getProfileCompletion(customer)}%</span>
                  <span>Completed</span>
                </div>
              </div>

              <div>
                <h3>Addresses</h3>
                <div>
                  <span>{customer?.shipping_addresses?.length || 0}</span>
                  <span>Saved</span>
                </div>
              </div>
            </div>

            <div>
              <div>
                <h3>Recent orders</h3>
              </div>
              <ul>
                {orders ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id}>
                        <Link href={`/order/details/${order.id}`}>
                          <Container>
                            <div>
                              <span>Date placed</span>
                              <span>Order number</span>
                              <span>Total amount</span>
                              <span>
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span>#{order.display_id}</span>
                              <span>
                                {formatAmount({
                                  amount: order.total,
                                  region: order.region,
                                  includeTaxes: false,
                                })}
                              </span>
                            </div>
                            <button onClick={close}>
                              <span>Go to order #{order.display_id}</span>
                              <ChevronDown />
                            </button>
                          </Container>
                        </Link>
                      </li>
                    )
                  })
                ) : (
                  <span>No recent orders</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer?: Omit<Customer, "password_hash">) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  if (customer.billing_address) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
