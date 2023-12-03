"use client"

import { useMobileMenu } from "@lib/context/mobile-menu-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
// import DropdownMenu from "@modules/layout/components/dropdown-menu"
import SideMenu from "@modules/layout/components/side-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import Link from "next/link"
import styles from "./nav.module.css"

const Nav = () => {
  const { toggle } = useMobileMenu()
  const {
    state: searchModalState,
    close: searchModalClose,
    open: searchModalOpen,
  } = useToggleState()

  return (
    <div>
      <header className={styles.header}>
        <nav>
          <div>
            {/* <div>
              <Hamburger setOpen={toggle} />
            </div> */}
            <div>
              <SideMenu searchModalOpen={searchModalOpen} />
            </div>
          </div>

          {/* <div>
            <Link href="/">Medusa Store</Link>
          </div> */}

          <div>
            <div>
              {process.env.FEATURE_SEARCH_ENABLED && (
                <DesktopSearchModal
                  state={searchModalState}
                  close={searchModalClose}
                  open={searchModalOpen}
                />
              )}
              <Link href="/account">Account</Link>
            </div>
            {/* <CartDropdown /> */}
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  )
}

export default Nav
