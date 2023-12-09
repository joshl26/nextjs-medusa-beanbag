import React, { useMemo } from "react"
import { medusaClient } from "@lib/config"
import { Cart } from "@medusajs/medusa"
import { Button, Label, Tooltip, Text, Heading } from "@medusajs/ui"
import { InformationCircleSolid } from "@medusajs/icons"
import Input from "@modules/common/components/input"
import Trash from "@modules/common/icons/trash"
import { formatAmount, useCart, useUpdateCart } from "medusa-react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import styles from "./discount-code.module.css"

type DiscountFormValues = {
  discount_code: string
}

type DiscountCodeProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const { id, discounts, gift_cards, region } = cart
  const { mutate, isLoading } = useUpdateCart(id)
  const { setCart } = useCart()

  const { isLoading: mutationLoading, mutate: removeDiscount } = useMutation(
    (payload: { cartId: string; code: string }) => {
      return medusaClient.carts.deleteDiscount(payload.cartId, payload.code)
    }
  )

  const appliedDiscount = useMemo(() => {
    if (!discounts || !discounts.length) {
      return undefined
    }

    switch (discounts[0].rule.type) {
      case "percentage":
        return `${discounts[0].rule.value}%`
      case "fixed":
        return `- ${formatAmount({
          amount: discounts[0].rule.value,
          region: region,
        })}`

      default:
        return "Free shipping"
    }
  }, [discounts, region])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    mode: "onSubmit",
  })

  const onApply = (data: DiscountFormValues) => {
    mutate(
      {
        discounts: [{ code: data.discount_code }],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () => {
          checkGiftCard(data.discount_code)
        },
      }
    )
  }

  const checkGiftCard = (code: string) => {
    mutate(
      {
        gift_cards: [
          { code: code },
          ...gift_cards.map((gc) => ({ code: gc.code })),
        ],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () => {
          setError(
            "discount_code",
            {
              message: "Code is invalid",
            },
            {
              shouldFocus: true,
            }
          )
        },
      }
    )
  }

  const removeGiftCard = (code: string) => {
    mutate(
      {
        gift_cards: [...gift_cards]
          .filter((gc) => gc.code !== code)
          .map((gc) => ({ code: gc.code })),
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
        },
      }
    )
  }

  const onRemove = () => {
    removeDiscount(
      { cartId: id, code: discounts[0].code },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
        },
      }
    )
  }

  return (
    <div>
      <div>
        {gift_cards.length > 0 && (
          <div>
            <h2>Gift card(s) applied:</h2>
            {gift_cards?.map((gc) => (
              <div key={gc.id}>
                <p>
                  <span>Code: </span>
                  <span>{gc.code}</span>
                </p>
                <p>{formatAmount({ region: region, amount: gc.balance })}</p>
                <button
                  onClick={() => removeGiftCard(gc.code)}
                  disabled={isLoading}
                >
                  <Trash size={14} />
                  <span>Remove gift card from order</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {appliedDiscount ? (
          <div>
            <div>
              <h2>Discount applied:</h2>
              <div>
                <p>
                  <span>Code:</span>
                  <span>{discounts[0].code}</span>
                  <span>({appliedDiscount})</span>
                </p>
                <button onClick={onRemove} disabled={isLoading}>
                  <Trash size={14} />
                  <span>Remove discount code from order</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onApply)}>
            <Label style={{ display: "flex" }}>
              Gift card or discount code?
              <div className="spacer_small"></div>
              <Tooltip
                className={styles.tooltip}
                content="You can add multiple gift cards, but only one discount code."
              >
                <InformationCircleSolid color="black" />
              </Tooltip>
            </Label>
            <div className="spacer_small"></div>
            <div>
              <Input
                className="input"
                // label="Please enter code"

                label=""
                {...register("discount_code", {
                  required: "Code is required",
                })}
                errors={errors}
              />
              <div className="spacer_small"></div>
              <Button type="submit" variant="secondary" isLoading={isLoading}>
                Apply
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
