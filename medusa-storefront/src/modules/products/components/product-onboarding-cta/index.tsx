import { Button, Container, Text } from "@medusajs/ui"

const ProductOnboardingCta = () => {
  return (
    <Container>
      <div>
        <Text>Your demo product was successfully created! 🎉</Text>
        <Text>You can now continue setting up your store in the admin.</Text>
        <a href="http://localhost:7001/a/orders?onboarding_step=create_order_nextjs">
          <Button>Continue setup in admin</Button>
        </a>
      </div>
    </Container>
  )
}

export default ProductOnboardingCta
