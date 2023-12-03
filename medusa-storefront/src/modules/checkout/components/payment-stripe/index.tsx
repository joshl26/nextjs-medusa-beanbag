import { ErrorMessage } from "@hookform/error-message"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js"
import {
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
} from "@stripe/stripe-js"
import React, { useMemo } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { CheckCircleMiniSolid } from "@medusajs/icons"

type PaymentStripeProps = StateProps & {
  useFormState: UseFormReturn<FieldValues, any, undefined>
}

type StateProps = {
  state: {
    cardNumberComplete: boolean
    cardExpiryComplete: boolean
    cardCvcComplete: boolean
  }
  setState: (state: PaymentStripeProps["state"]) => void
}

const PaymentStripe: React.FC<PaymentStripeProps> = ({
  useFormState,
  setState,
  state,
}) => {
  const useOptions:
    | StripeCardNumberElementOptions
    | StripeCardExpiryElementOptions
    | StripeCardCvcElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "#CFD7E0",
          },
        },
      },
      classes: {
        // base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover",
        base: "",
      },
    }
  }, [])

  return (
    <div>
      <CardNumber
        options={useOptions as StripeCardNumberElementOptions}
        useFormState={useFormState}
        setState={setState}
        state={state}
      />
      <div>
        <CardExpiry
          options={useOptions as StripeCardExpiryElementOptions}
          useFormState={useFormState}
          setState={setState}
          state={state}
        />
        <CardCVC
          options={useOptions as StripeCardCvcElementOptions}
          useFormState={useFormState}
          setState={setState}
          state={state}
        />
      </div>
    </div>
  )
}

const CardNumber = ({
  useFormState,
  options,
  state,
  setState,
}: {
  useFormState: UseFormReturn<FieldValues, any, undefined>
  options: StripeCardNumberElementOptions
  state: StateProps["state"]
  setState: StateProps["setState"]
}) => {
  const {
    setError,
    formState: { errors },
    clearErrors,
  } = useFormState

  const handleChange = (event: any) => {
    clearErrors("cardNumber")
    setState({ ...state, cardNumberComplete: false })

    if (event.complete) {
      setState({ ...state, cardNumberComplete: true })
    }

    if (event.error) {
      setError("cardNumber", {
        type: "stripe",
        message: event.error.message,
      })
    }
  }

  return (
    <div>
      <span>
        Card number
        {state.cardNumberComplete && <CheckCircleMiniSolid />}
      </span>
      <CardNumberElement options={options} onChange={handleChange} />
      <ErrorMessage
        errors={errors}
        name="cardNumber"
        render={({ message }) => {
          return (
            <div>
              <span>{message}</span>
            </div>
          )
        }}
      />
    </div>
  )
}

const CardExpiry = ({
  useFormState,
  options,
  state,
  setState,
}: {
  useFormState: UseFormReturn<FieldValues, any, undefined>
  options: StripeCardExpiryElementOptions
  state: StateProps["state"]
  setState: StateProps["setState"]
}) => {
  const {
    setError,
    formState: { errors },
    clearErrors,
  } = useFormState

  const handleChange = (event: any) => {
    clearErrors("cardExpiry")
    setState({ ...state, cardExpiryComplete: false })

    if (event.complete) {
      setState({ ...state, cardExpiryComplete: true })
    }

    if (event.error) {
      setError("cardExpiry", {
        type: "stripe",
        message: event.error.message,
      })
    }
  }

  return (
    <div>
      <span>
        Expiration date
        {state.cardExpiryComplete && <CheckCircleMiniSolid />}
      </span>
      <CardExpiryElement options={options} onChange={handleChange} />
      <ErrorMessage
        errors={errors}
        name="cardExpiry"
        render={({ message }) => {
          return (
            <div>
              <span>{message}</span>
            </div>
          )
        }}
      />
    </div>
  )
}

const CardCVC = ({
  useFormState,
  options,
  state,
  setState,
}: {
  useFormState: UseFormReturn<FieldValues, any, undefined>
  options: StripeCardCvcElementOptions
  state: StateProps["state"]
  setState: StateProps["setState"]
}) => {
  const {
    setError,
    formState: { errors },
    clearErrors,
  } = useFormState

  const handleChange = (event: any) => {
    clearErrors("cardCvc")
    setState({ ...state, cardCvcComplete: false })

    if (event.complete) {
      setState({ ...state, cardCvcComplete: true })
    }

    if (event.error) {
      setError("cardCvc", {
        type: "stripe",
        message: event.error.message,
      })
    }
  }

  return (
    <div>
      <span>
        CVC
        {state.cardCvcComplete && <CheckCircleMiniSolid />}
      </span>
      <CardCvcElement
        options={{ ...options, placeholder: "123" }}
        onChange={handleChange}
      />
      <ErrorMessage
        errors={errors}
        name="cardCvc"
        render={({ message }) => {
          return (
            <div>
              <span>{message}</span>
            </div>
          )
        }}
      />
    </div>
  )
}

export default PaymentStripe
