import { ErrorMessage } from "@hookform/error-message"
import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"
import clsx from "clsx"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { get } from "react-hook-form"
import { Label, Input as UiInput } from "@medusajs/ui"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { type, name, label, errors, touched, required, topLabel, ...props },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    const hasError = get(errors, name) && get(touched, name)

    return (
      <div>
        {topLabel && <Label>{topLabel}</Label>}
        <div>
          <input
            type={inputType}
            name={name}
            aria-invalid={hasError}
            placeholder=" "
            // className={clsx(
            //   "pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover",
            //   {
            //     "border-rose-500 focus:border-rose-500": hasError,
            //   }
            // )}
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            // className={clsx(
            //   "flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-gray-500",
            //   {
            //     "!text-rose-500": hasError,
            //   }
            // )}
          >
            {label}
            {required && <span>*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div>
                  <span>{message}</span>
                </div>
              )
            }}
          />
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
