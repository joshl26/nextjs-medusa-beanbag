import { useCheckout } from "@lib/context/checkout-context"
import { Heading, Text, clx } from "@medusajs/ui"
import PaymentButton from "../payment-button"

const Review = () => {
  const {
    cart,
    editPayment: { state: isEditPayment },
    editAddresses: { state: isEditAddresses },
    editShipping: { state: isEditShipping },
  } = useCheckout()

  const previousStepsCompleted =
    !!cart?.shipping_address &&
    !!cart.shipping_methods?.[0]?.shipping_option.id &&
    !!cart?.payment_sessions

  const editingOtherSteps = isEditAddresses || isEditShipping || isEditPayment

  return (
    <div >
      <div >
        <Heading
          level="h2"
          // className={clx(
          //   "flex flex-row text-3xl-regular gap-x-2 items-baseline",
          //   {
          //     "opacity-50 pointer-events-none select-none": editingOtherSteps,
          //   }
          // )}
        >
          Review
        </Heading>
      </div>
      {!editingOtherSteps && previousStepsCompleted && (
        <>
          <div >
            <div >
              <Text >
                By clicking the Place Order button, you confirm that you have
                read, understand and accept our Terms of Use, Terms of Sale and
                Returns Policy and acknowledge that you have read Medusa
                Store&apos;s Privacy Policy.
              </Text>
            </div>
          </div>
          <PaymentButton paymentSession={cart?.payment_session} />
        </>
      )}
    </div>
  )
}

export default Review
