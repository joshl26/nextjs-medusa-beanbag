"use client"

import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page"
import { useCart, useMeCustomer } from "medusa-react"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import ItemsTemplate from "./items"
import Summary from "./summary"
import Divider from "@modules/common/components/divider"

const CartTemplate = () => {
  const { cart } = useCart()
  const { customer, isLoading } = useMeCustomer()
  const items = useEnrichedLineItems()

  if (!cart || !cart?.id?.length || isLoading) {
    return <SkeletonCartPage />
  }

  return (
    <div>
      <div>
        {cart.items.length ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0.5rem",
            }}
          >
            <div>
              {!customer && (
                <div style={{ padding: "0.25rem" }}>
                  <SignInPrompt />
                  <div className="spacer_small"></div>
                  <div className="spacer_small"></div>
                  <div className="divider"></div>
                </div>
              )}

              <ItemsTemplate region={cart?.region} items={items} />
            </div>
            <div>
              <div>
                {cart && cart.region && (
                  <>
                    <div>
                      <Summary cart={cart} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
