import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"
import { Suspense } from "react"
import Loading from "./loading"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default function Cart() {
  return (
    <Suspense fallback={<Loading />}>
      <CartTemplate />
    </Suspense>
  )
}
