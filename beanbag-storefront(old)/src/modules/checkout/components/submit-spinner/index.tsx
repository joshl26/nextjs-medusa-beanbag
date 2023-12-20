"use client"

import { Heading, Text } from "@medusajs/ui"
import { Spinner } from "@medusajs/icons"
import { useCart } from "medusa-react"

const SubmitSpinner = () => {
  const {
    completeCheckout: { isLoading },
  } = useCart()

  if (isLoading) {
    return (
      <div >
        <div >
          <div >
            <Spinner  />
            <Heading >
              Please wait...
            </Heading>
          </div>
          <Text>
            Your order is processing. Do not press back or refresh until your
            order is complete.
          </Text>
        </div>
      </div>
    )
  }

  return null
}

export default SubmitSpinner
