import OrderOverview from "../components/order-overview"

const OrdersTemplate = () => {
  return (
    <div >
      <div >
        <h1 >Orders</h1>
        <p >
          View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.
        </p>
      </div>
      <div>
        <OrderOverview />
      </div>
    </div>
  )
}

export default OrdersTemplate
