import { useCheckout } from "@lib/context/checkout-context"
import { Button, Heading, Text, clx } from "@medusajs/ui"
import { CheckCircleSolid } from "@medusajs/icons"
import Spinner from "@modules/common/icons/spinner"
import Divider from "@modules/common/components/divider"
import { useForm } from "react-hook-form"
import { RadioGroup } from "@headlessui/react"
import Radio from "@modules/common/components/radio"
import { ErrorMessage } from "@hookform/error-message"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import { useEffect, useMemo, useState } from "react"
import { Cart } from "@medusajs/medusa"

type ShippingOption = {
  value?: string
  label?: string
  price: string
}

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const Shipping: React.FC<ShippingProps> = ({ cart }) => {
  const {
    editAddresses: { state: isAddressesOpen, close: closeAddresses },
    editShipping: { state: isOpen, open, close },
    editPayment: {
      state: isPaymentOpen,
      open: openPayment,
      close: closePayment,
    },
    addressReady,
    shippingReady,
  } = useCheckout()

  const currentShippingOption =
    cart.shipping_methods?.[0]?.shipping_option.id || ""

  const [shippingOptionId, setShippingOptionId] = useState(
    currentShippingOption
  )

  const { addShippingMethod, setCart } = useCart()

  const {
    setError,
    formState: { errors },
  } = useForm()

  // Fetch shipping options
  const { shipping_options, refetch } = useCartShippingOptions(cart.id, {
    enabled: !!cart.id,
  })

  // Any time the cart changes we need to ensure that we are displaying valid shipping options
  useEffect(() => {
    const refetchShipping = async () => {
      await refetch()
    }

    refetchShipping()
  }, [cart, refetch])

  const submitShippingOption = (soId: string) => {
    addShippingMethod.mutate(
      { option_id: soId },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          close()
          openPayment()
        },
        onError: () =>
          setError(
            "soId",
            {
              type: "validate",
              message:
                "An error occurred while adding shipping. Please try again.",
            },
            { shouldFocus: true }
          ),
      }
    )
  }

  const handleChange = (value: string) => {
    setShippingOptionId(value)
  }

  const handleEdit = () => {
    open()
    closeAddresses()
    closePayment()
  }

  const editingOtherSteps = isAddressesOpen || isPaymentOpen

  // Memoized shipping method options
  const shippingMethods: ShippingOption[] = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          amount: option.amount || 0,
          region: cart.region,
        }),
      }))
    }

    return []
  }, [shipping_options, cart])

  return (
    <div >
      <div >
        <Heading
          level="h2"
          // className={clx(
          //   "flex flex-row text-3xl-regular gap-x-2 items-baseline",
          //   {
          //     "opacity-50 pointer-events-none select-none":
          //       editingOtherSteps && !shippingReady,
          //   }
          // )}
        >
          Delivery
          {!isOpen && currentShippingOption && shippingReady && (
            <CheckCircleSolid />
          )}
        </Heading>
        {!isOpen && addressReady && (
          <Text>
            <button onClick={handleEdit} >
              Edit
            </button>
          </Text>
        )}
      </div>
      {!editingOtherSteps && isOpen ? (
        <div >
          <div>
            <RadioGroup
              value={shippingOptionId}
              onChange={(value: string) => handleChange(value)}
            >
              {shippingMethods && shippingMethods.length ? (
                shippingMethods.map((option) => {
                  return (
                    <RadioGroup.Option
                      key={option.value}
                      value={option.value}
                      // className={clx(
                      //   "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
                      //   {
                      //     "border-ui-border-interactive":
                      //       option.value === shippingOptionId,
                      //   }
                      // )}
                    >
                      <div >
                        <Radio checked={shippingOptionId === option.value} />
                        <span >
                          {option.label}
                        </span>
                      </div>
                      <span >
                        {option.price}
                      </span>
                    </RadioGroup.Option>
                  )
                })
              ) : (
                <div >
                  <Spinner />
                </div>
              )}
            </RadioGroup>
            <ErrorMessage
              errors={errors}
              name="soId"
              render={({ message }) => {
                return (
                  <div >
                    <span>{message}</span>
                  </div>
                )
              }}
            />
          </div>

          <Button
            size="large"
            
            onClick={() => submitShippingOption(shippingOptionId)}
          >
            Continue to payment
          </Button>
        </div>
      ) : (
        <div>
          <div >
            {cart && shippingReady && (
              <div >
                <Text >
                  Method
                </Text>
                <Text >
                  {cart.shipping_methods[0].shipping_option.name} (
                  {formatAmount({
                    amount: cart.shipping_methods[0].price,
                    region: cart.region,
                  })
                    .replace(/,/g, "")
                    .replace(/\./g, ",")}
                  )
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider  />
    </div>
  )
}

export default Shipping
