import { ErrorMessage } from "@hookform/error-message"
import { ChevronUpDown } from "@medusajs/icons"
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
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
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
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          // className={clsx(
          //   "relative flex items-center text-base-regular border border-ui-border-base bg-ui-bg-subtle rounded-md hover:bg-ui-bg-field-hover",
          //   className,
          //   {
          //     "text-ui-fg-muted": isPlaceholder,
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
            <ChevronUpDown />
          </span>
        </div>
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

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
