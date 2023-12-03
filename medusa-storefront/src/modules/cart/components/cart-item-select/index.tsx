import { ErrorMessage } from "@hookform/error-message"
import { IconBadge } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"
import {
  forwardRef,
  SelectHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { get } from "react-hook-form"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">

const CartItemSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      placeholder = "Select...",
      errors,
      touched,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    const hasError = props.name
      ? get(errors, props.name) && get(touched, props.name)
      : false

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div>
        <IconBadge
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          // className={clsx(
          //   "relative flex items-center txt-compact-small border text-ui-fg-base group",
          //   className,
          //   {
          //     "text-ui-fg-subtle": isPlaceholder,
          //   }
          // )}
        >
          <select ref={innerRef} {...props}>
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span>
            <ChevronDown />
          </span>
        </IconBadge>
        {hasError && props.name && (
          <ErrorMessage
            errors={errors}
            name={props.name}
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

CartItemSelect.displayName = "CartItemSelect"

export default CartItemSelect
