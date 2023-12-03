import { Heading } from "@medusajs/ui"
import Link from "next/link"
import React from "react"

const Help = () => {
  return (
    <div>
      <Heading>Need help?</Heading>
      <div>
        <ul>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/contact">Returns & Exchanges</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
