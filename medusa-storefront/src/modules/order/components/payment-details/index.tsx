import { Order } from "@medusajs/medusa"
import { Container, Heading, Text } from "@medusajs/ui"
import { paymentInfoMap } from "@modules/checkout/components/payment"
import Divider from "@modules/common/components/divider"
import { formatAmount } from "medusa-react"

type PaymentDetailsProps = {
  order: Order
}

const currencyCodeSymbolMap: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  DKK: "kr",
  GBP: "£",
  SEK: "kr",
  NOK: "kr",
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payments[0]
  return (
    <div>
      <Heading level="h2">Payment</Heading>
      <div>
        {payment && (
          <div>
            <div>
              <Text>Payment method</Text>
              <Text>{paymentInfoMap[payment.provider_id].title}</Text>
            </div>
            <div>
              <Text>Payment details</Text>
              <div>
                <Container>
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                <Text>
                  {payment.provider_id === "stripe" && payment.data.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${formatAmount({
                        amount: payment.amount,
                        region: order.region,
                      })} paid at ${new Date(
                        payment.created_at
                      ).toLocaleString()}`}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
      <Divider />
    </div>
  )
}

export default PaymentDetails
