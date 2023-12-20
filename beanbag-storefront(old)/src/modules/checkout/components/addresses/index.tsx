import { useCheckout } from "@lib/context/checkout-context"
import { Button, Heading, Text } from "@medusajs/ui"
import { CheckCircleSolid } from "@medusajs/icons"
import Spinner from "@modules/common/icons/spinner"
import BillingAddress from "../billing_address"
import ShippingAddress from "../shipping-address"
import Divider from "@modules/common/components/divider"

const Addresses = () => {
  const {
    sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isOpen, open },
    editShipping: { close: closeShipping },
    editPayment: { close: closePayment },
    setAddresses,
    handleSubmit,
    cart,
  } = useCheckout()

  const handleEdit = () => {
    open()
    closeShipping()
    closePayment()
  }

  return (
    <div>
      <div>
        <Heading level="h2">
          Address
          {!isOpen && <CheckCircleSolid />}
        </Heading>
        {!isOpen && (
          <Text>
            <button onClick={handleEdit}>Edit</button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <div>
          <ShippingAddress checked={checked} onChange={onChange} />

          {!checked && (
            <div>
              <Heading level="h2">Billing address</Heading>

              <BillingAddress />
            </div>
          )}

          <Button size="large" onClick={handleSubmit(setAddresses)}>
            Continue to delivery
          </Button>
        </div>
      ) : (
        <div>
          <div>
            {cart && cart.shipping_address ? (
              <div>
                <div>
                  <div>
                    <Text>Shipping Address</Text>
                    <Text>
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text>
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text>
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text>
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div>
                    <Text>Contact</Text>
                    <Text>{cart.shipping_address.phone}</Text>
                    <Text>{cart.email}</Text>
                  </div>

                  <div>
                    <Text>Billing Address</Text>

                    {checked ? (
                      <Text>Billing- and delivery address are the same.</Text>
                    ) : (
                      <>
                        <Text>
                          {cart.billing_address.first_name}{" "}
                          {cart.billing_address.last_name}
                        </Text>
                        <Text>
                          {cart.billing_address.address_1}{" "}
                          {cart.billing_address.address_2}
                        </Text>
                        <Text>
                          {cart.billing_address.postal_code},{" "}
                          {cart.billing_address.city}
                        </Text>
                        <Text>
                          {cart.billing_address.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider />
    </div>
  )
}

export default Addresses
