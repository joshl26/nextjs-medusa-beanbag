import { useAccount } from "@lib/context/account-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AccountNav = () => {
  const route = usePathname()
  const { handleLogout } = useAccount()

  return (
    <div>
      <div>
        {route !== "/account" && (
          <Link href="/account">
            <>
              <ChevronDown />
              <span>Account</span>
            </>
          </Link>
        )}
      </div>
      <div>
        <div>
          <div>
            <h3>Account</h3>
          </div>
          <div>
            <ul>
              <li>
                <AccountNavLink href="/account" route={route!}>
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/profile" route={route!}>
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/addresses" route={route!}>
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route!}>
                  Orders
                </AccountNavLink>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
}

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href
  return (
    <Link
      href={href}
      // className={clsx("text-gray-700", {
      //   "text-gray-900 font-semibold": active,
      // })}
    >
      <>{children}</>
    </Link>
  )
}

export default AccountNav
