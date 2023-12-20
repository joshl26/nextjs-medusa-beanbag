import { Cart } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import Input from "@modules/common/components/input"
import Trash from "@modules/common/icons/trash"
import { useCart } from "medusa-react"
import React, { useMemo } from "react"
import { useForm } from "react-hook-form"

type GiftCardFormValues = {
  gift_card_code: string
}

type GiftCardProps = {
  cart?: Omit<Cart, "refundable_amount" | "refunded_total">
}

const GiftCard: React.FC<GiftCardProps> = ({ cart }) => {
  const {
    updateCart: { mutate, isLoading },
    setCart,
  } = useCart()

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors },
    setError,
  } = useForm<GiftCardFormValues>()

  const appliedGiftCard = useMemo(() => {
    if (!cart || !cart.gift_cards?.length) {
      return undefined
    }

    return cart.gift_cards[0].code
  }, [cart])

  const onSubmit = (data: GiftCardFormValues) => {
    mutate(
      {
        gift_cards: [{ code: data.gift_card_code }],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () => {
          setError(
            "gift_card_code",
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

  const onRemove = () => {
    mutate(
      {
        gift_cards: [],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
      }
    )
  }

  return (
    <div >
      <div >
        <h3 >Gift Card</h3>
      </div>
      <div >
        {appliedGiftCard ? (
          <div >
            <div>
              <span >Code: </span>
              <span >{appliedGiftCard}</span>
            </div>
            <div>
              <button
                
                onClick={onRemove}
                disabled={isLoading}
              >
                <Trash size={16} />
                <span >Remove gift card from order</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} >
            <div >
              <Input
                label="Code"
                {...register("gift_card_code", {
                  required: "Code is required",
                })}
                errors={errors}
                touched={touchedFields}
              />
              <div>
                <Button
                  
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Apply
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default GiftCard
