import { Listbox, Transition } from "@headlessui/react"
import { useCheckout } from "@lib/context/checkout-context"
import { Address } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import ChevronDown from "@modules/common/icons/chevron-down"
import { ChevronUpDown } from "@medusajs/icons"
import clsx from "clsx"
import { isEqual, omit } from "lodash"
import { Fragment, useMemo, useState } from "react"
import { useWatch } from "react-hook-form"

type AddressSelectProps = {
  addresses: Address[]
}

const AddressSelect = ({ addresses }: AddressSelectProps) => {
  const [selected, setSelected] = useState<string | undefined>(undefined)

  const { control, setSavedAddress } = useCheckout()

  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)

    if (savedAddress) {
      setSavedAddress(savedAddress)
    }

    setSelected(id)
  }

  const currentShippingAddress = useWatch({
    control,
    name: "shipping_address",
  })

  const selectedAddress = useMemo(() => {
    for (const address of addresses) {
      const checkEquality = isEqual(
        omit(address, [
          "id",
          "created_at",
          "updated_at",
          "country",
          "deleted_at",
          "metadata",
          "customer_id",
        ]),
        currentShippingAddress
      )

      if (checkEquality) {
        return address
      }
    }
  }, [currentShippingAddress, addresses])

  return (
    <Listbox onChange={handleSelect} value={selected}>
      <div>
        <Listbox.Button>
          {({ open }) => (
            <>
              <span>
                {selectedAddress
                  ? selectedAddress.address_1
                  : "Choose an address"}
              </span>
              <ChevronUpDown
              // className={clsx("transition-rotate duration-200", {
              //   "transform rotate-180": open,
              // })}
              />
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options >
            {addresses.map((address) => {
              return (
                <Listbox.Option
                  key={address.id}
                  value={address.id}
                  
                >
                  <div >
                    <Radio checked={selected === address.id} />
                    <div >
                      <span >
                        {address.first_name} {address.last_name}
                      </span>
                      {address.company && (
                        <span >
                          {address.company}
                        </span>
                      )}
                      <div >
                        <span>
                          {address.address_1}
                          {address.address_2 && (
                            <span>, {address.address_2}</span>
                          )}
                        </span>
                        <span>
                          {address.postal_code}, {address.city}
                        </span>
                        <span>
                          {address.province && `${address.province}, `}
                          {address.country_code?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AddressSelect
