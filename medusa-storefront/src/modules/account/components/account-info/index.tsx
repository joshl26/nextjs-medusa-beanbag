import { Disclosure } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { Badge } from "@medusajs/ui"
import { Button } from "@medusajs/ui"
import clsx from "clsx"
import { useEffect } from "react"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
}

const AccountInfo = ({
  label,
  currentInfo,
  isLoading,
  isSuccess,
  isError,
  clearState,
  errorMessage = "An error occurred, please try again",
  children,
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div>
      <div>
        <div>
          <span>{label}</span>
          <div>
            {typeof currentInfo === "string" ? (
              <span>{currentInfo}</span>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        <div>
          <Button
            variant="secondary"
            onClick={handleToggle}
            type={state ? "reset" : "button"}
          >
            {state ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>

      {/* Success state */}
      <Disclosure>
        <Disclosure.Panel
          static
          // className={clsx(
          //   "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
          //   {
          //     "max-h-[1000px] opacity-100": isSuccess,
          //     "max-h-0 opacity-0": !isSuccess,
          //   }
          // )}
        >
          <Badge color="green">
            <span>{label} updated succesfully</span>
          </Badge>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error state  */}
      <Disclosure>
        <Disclosure.Panel
          static
          // className={clsx(
          //   "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
          //   {
          //     "max-h-[1000px] opacity-100": isError,
          //     "max-h-0 opacity-0": !isError,
          //   }
          // )}
        >
          <Badge color="red">
            <span>{errorMessage}</span>
          </Badge>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          // className={clsx(
          //   "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
          //   {
          //     "max-h-[1000px] opacity-100": state,
          //     "max-h-0 opacity-0": !state,
          //   }
          // )}
        >
          <div>
            <div>{children}</div>
            <div>
              <Button isLoading={isLoading} type="submit">
                Save changes
              </Button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo
