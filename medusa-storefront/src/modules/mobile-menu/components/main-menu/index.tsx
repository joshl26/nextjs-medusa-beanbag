import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { useStore } from "@lib/context/store-context"
import useCountryOptions from "@lib/hooks/use-country-options"
import ChevronDown from "@modules/common/icons/chevron-down"
import { MagnifyingGlassMini, XMark as X } from "@medusajs/icons"
import { useCollections, useMeCustomer } from "medusa-react"
import Link from "next/link"
import ReactCountryFlag from "react-country-flag"
import { Heading } from "@medusajs/ui"

const MainMenu = () => {
  const { collections } = useCollections()
  const { customer } = useMeCustomer()
  const { countryCode } = useStore()

  const countries = useCountryOptions()

  const {
    close,
    screen: [_, setScreen],
  } = useMobileMenu()

  const setScreenCountry = () => setScreen("country")
  const setScreenSearch = () => setScreen("search")

  return (
    <div>
      <div>
        <div>
          <button onClick={setScreenCountry}>
            <ReactCountryFlag countryCode={countryCode || "us"} svg />
            <ChevronDown />
          </button>
        </div>

        <Heading>Medusa Store</Heading>

        <div>
          <button onClick={close}>
            <X />
          </button>
        </div>
      </div>

      <div>
        {process.env.FEATURE_SEARCH_ENABLED && (
          <button onClick={setScreenSearch}>
            <MagnifyingGlassMini />
            <span placeholder="Search products">Search products</span>
          </button>
        )}

        <div>
          <ul>
            <li>
              <Link href="/store">
                <button onClick={close}>
                  <span>Go to Store</span>
                  <span>Store</span>
                  <ChevronDown />
                </button>
              </Link>
            </li>
            {collections ? (
              <>
                {collections.map((collection) => (
                  <li key={collection.id}>
                    <Link href={`/collections/${collection.handle}`}>
                      <button onClick={close}>
                        <span>Go to {collection.title} collection</span>
                        <span>{collection.title}</span>
                        <ChevronDown />
                      </button>
                    </Link>
                  </li>
                ))}
              </>
            ) : null}
          </ul>
        </div>

        <div>
          <div>
            {!customer ? (
              <div>
                <span>Account</span>
                <Link href={`/account/login`} passHref>
                  <button onClick={close}>
                    <span className="sr-only">Go to sign in page</span>
                    <span className="normal-case">Sign in</span>
                    <ChevronDown className="-rotate-90" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-y-4">
                <span className="text-gray-700 uppercase">Signed in as</span>
                <Link href={`/account`} passHref>
                  <button
                    className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                    onClick={close}
                  >
                    <span>Go to account page</span>
                    <span>{customer.email}</span>
                    <ChevronDown />
                  </button>
                </Link>
              </div>
            )}
            <div>
              <span>Delivery</span>
              <button onClick={setScreenCountry}>
                <span>Click to select shipping country</span>
                <div>
                  <ReactCountryFlag countryCode={countryCode || "us"} svg />
                  <span>
                    Shipping to{" "}
                    {countries?.find((c) => c.country === countryCode)?.label}
                  </span>
                </div>
                <ChevronDown />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainMenu
