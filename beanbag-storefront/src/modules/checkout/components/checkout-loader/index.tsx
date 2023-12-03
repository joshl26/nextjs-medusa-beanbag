"use client"

import { Dialog, Transition } from "@headlessui/react"
import { useCheckout } from "@lib/context/checkout-context"
import noop from "@lib/util/noop"
import Spinner from "@modules/common/icons/spinner"

const CheckoutLoader = () => {
  const { isLoading } = useCheckout()

  return (
    <Transition show={isLoading}>
      <Dialog onClose={noop}>
        <Transition.Child
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <Spinner size={24} />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default CheckoutLoader
