import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import { Address } from "@medusajs/medusa"
import CountrySelect from "@modules/checkout/components/country-select"
import { Button, Heading, Text } from "@medusajs/ui"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  first_name: string
  last_name: string
  city: string
  country_code: string
  postal_code: string
  province?: string
  address_1: string
  address_2?: string
  phone?: string
  company?: string
}

type EditAddressProps = {
  address: Address
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  address,
  isActive = false,
}) => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const { refetchCustomer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      first_name: address.first_name || undefined,
      last_name: address.last_name || undefined,
      city: address.city || undefined,
      address_1: address.address_1 || undefined,
      address_2: address.address_2 || undefined,
      country_code: address.country_code || undefined,
      postal_code: address.postal_code || undefined,
      phone: address.phone || undefined,
      company: address.company || undefined,
      province: address.province || undefined,
    },
  })

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company || "Personal",
      address_1: data.address_1,
      address_2: data.address_2 || "",
      city: data.city,
      country_code: data.country_code,
      province: data.province || "",
      postal_code: data.postal_code,
      phone: data.phone || "None",
      metadata: {},
    }

    medusaClient.customers.addresses
      .updateAddress(address.id, payload)
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        close()
      })
      .catch(() => {
        setSubmitting(false)
        setError("Failed to update address, please try again.")
      })
  })

  const removeAddress = () => {
    medusaClient.customers.addresses.deleteAddress(address.id).then(() => {
      refetchCustomer()
    })
  }

  return (
    <>
      <div
      // className={clsx(
      //   "border rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors",
      //   {
      //     "border-gray-900": isActive,
      //   }
      // )}
      >
        <div>
          <Heading>
            {address.first_name} {address.last_name}
          </Heading>
          {address.company && <Text>{address.company}</Text>}
          <Text>
            <span>
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span>
              {address.postal_code}, {address.city}
            </span>
            <span>
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </Text>
        </div>
        <div>
          <button onClick={open}>
            <Edit />
            Edit
          </button>
          <button onClick={removeAddress}>
            <Trash />
            Remove
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close}>
        <Modal.Title>
          <Heading>Edit address</Heading>
        </Modal.Title>
        <Modal.Body>
          <div>
            <div>
              <Input
                label="First name"
                {...register("first_name", {
                  required: "First name is required",
                })}
                required
                errors={errors}
                autoComplete="given-name"
              />
              <Input
                label="Last name"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                required
                errors={errors}
                autoComplete="family-name"
              />
            </div>
            <Input label="Company" {...register("company")} errors={errors} />
            <Input
              label="Address"
              {...register("address_1", {
                required: "Address is required",
              })}
              required
              errors={errors}
              autoComplete="address-line1"
            />
            <Input
              label="Apartment, suite, etc."
              {...register("address_2")}
              errors={errors}
              autoComplete="address-line2"
            />
            <div>
              <Input
                label="Postal code"
                {...register("postal_code", {
                  required: "Postal code is required",
                })}
                required
                errors={errors}
                autoComplete="postal-code"
              />
              <Input
                label="City"
                {...register("city", {
                  required: "City is required",
                })}
                errors={errors}
                required
                autoComplete="locality"
              />
            </div>
            <Input
              label="Province / State"
              {...register("province")}
              errors={errors}
              autoComplete="address-level1"
            />
            <CountrySelect
              {...register("country_code", { required: true })}
              autoComplete="country"
            />
            <Input
              label="Phone"
              {...register("phone")}
              errors={errors}
              autoComplete="phone"
            />
          </div>
          {error && <div>{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button variant="secondary" onClick={close} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={submit} isLoading={submitting}>
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditAddress
