import { Button, Container, Text } from "@medusajs/ui"

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  const resetOnboarding = () => {
    window.sessionStorage.setItem("onboarding", "false")
  }

  return (
    <Container>
      <div>
        <Text>Your test order was successfully created! 🎉</Text>
        <Text>You can now complete setting up your store in the admin.</Text>
        <a
          href={`http://localhost:7001/a/orders/${orderId}`}
          onClick={resetOnboarding}
        >
          <Button>Complete setup in admin</Button>
        </a>
      </div>
    </Container>
  )
}

export default OnboardingCta
