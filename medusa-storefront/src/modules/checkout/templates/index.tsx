import { CheckoutProvider } from "@lib/context/checkout-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/coffee-bean-cta"
import Link from "next/link"
import CheckoutLoader from "../components/checkout-loader"
import CheckoutForm from "./checkout-form"
import CheckoutSummary from "./checkout-summary"
import SubmitSpinner from "../components/submit-spinner"

const CheckoutTemplate = () => {
  return (
    <CheckoutProvider>
      <div>
        <SubmitSpinner />
        <div>
          <nav>
            <Link href="/cart">
              <>
                <ChevronDown size={16} />
                <span>Back to shopping cart</span>
                <span>Back</span>
              </>
            </Link>
            <Link href="/">Medusa Store</Link>
            <div />
          </nav>
        </div>
        <div>
          <CheckoutLoader />
          <div>
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </div>
        <div>
          <MedusaCTA />
        </div>
      </div>
    </CheckoutProvider>
  )
}

export default CheckoutTemplate
