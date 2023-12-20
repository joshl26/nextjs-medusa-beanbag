import { Heading, Text } from "@medusajs/ui"
import UnderlineLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div>
      <Heading level="h1">Cart</Heading>
      <Text>
        You don&apos;t have anything in your bag. Let&apos;s change that, use
        the link below to start browsing our products.
      </Text>
      <div>
        <UnderlineLink href="/store">Explore products</UnderlineLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
