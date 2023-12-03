import { Customer } from "@medusajs/medusa"
import React from "react"
import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"

type AddressBookProps = {
  customer: Omit<Customer, "password_hash">
}

const AddressBook: React.FC<AddressBookProps> = ({ customer }) => {
  return (
    <div>
      <div>
        <AddAddress />
        {customer.shipping_addresses.map((address) => {
          return <EditAddress address={address} key={address.id} />
        })}
      </div>
    </div>
  )
}

export default AddressBook
