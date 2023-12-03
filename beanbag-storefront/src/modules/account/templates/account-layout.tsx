"use client"

import { useAccount } from "@lib/context/account-context"
import UnderlineLink from "@modules/common/components/interactive-link"
import Spinner from "@modules/common/icons/spinner"
import React, { useEffect } from "react"
import AccountNav from "../components/account-nav"

const AccountLayout: React.FC = ({ children }) => {
  const { customer, retrievingCustomer, checkSession } = useAccount()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (retrievingCustomer || !customer) {
    return (
      <div >
        <Spinner size={36} />
      </div>
    )
  }

  return (
    <div >
      <div >
        <div >
          <div>
            <AccountNav />
          </div>
          <div >{children}</div>
        </div>
        <div >
          <div>
            <h3 >Got questions?</h3>
            <span >
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
