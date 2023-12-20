import { Badge } from "@medusajs/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <Badge color="orange" className={className}>
      <span>Attention:</span> For testing purposes only.
    </Badge>
  )
}

export default PaymentTest
