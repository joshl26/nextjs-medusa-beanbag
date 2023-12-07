"use client"

import { useMobileMenu } from "@lib/context/mobile-menu-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import Hamburger from "@modules/common/components/hamburger"
import RoundButton from "@modules/common/components/round-button"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import SideMenu from "@modules/layout/components/side-menu"
// import DropdownMenu from "@modules/layout/components/dropdown-menu"
// import SideMenu from "@modules/layout/components/side-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import { CldImage } from "next-cloudinary"
import Link from "next/link"
import { useState } from "react"
import styles from "./nav.module.css"

const Nav = () => {
  const { toggle } = useMobileMenu()
  const {
    state: searchModalState,
    close: searchModalClose,
    open: searchModalOpen,
  } = useToggleState()

  const [menuEnabled, setMenuEnabled] = useState(false)

  const handleMenuClick = () => {
    console.log("menu click")
    setMenuEnabled(!menuEnabled)
  }

  return (
    <header className={styles.header}>
      <nav className={styles.header_nav}>
        <div className={styles.side_menu}>
          {menuEnabled ? <SideMenu setMenuEnabled={setMenuEnabled} /> : ""}
        </div>
        <MobileMenu />
        <div className={styles.spacer} />
        <div className={styles.navbar}>
          <div className={styles.link_container}>
            <div className={styles.hero_image}>
              <Link href="/">
                <CldImage
                  alt="BeanbagCoffee/Beanbag_o1njjx"
                  width="50"
                  height="50"
                  src="BeanbagCoffee/Beanbag_o1njjx"
                />
              </Link>
            </div>
            <div className={styles.links}>
              <Link href="/menu">
                <h4 className={styles.link}>MENU</h4>
              </Link>
              <Link href="/rewards">
                <h4 className={styles.link}>REWARDS</h4>
              </Link>
              <Link href="/gift-cards">
                <h4 className={styles.link}>GIFT CARDS</h4>
              </Link>
            </div>
          </div>
          <div className={styles.button_container}>
            <RoundButton
              href="/signin"
              className={styles.button_signin}
              buttonText="Sign In"
            />
            <div style={{ width: "100px", height: "100%" }}>
              <CartDropdown />
            </div>

            {/* <RoundButton
              className={styles.button_joinnow}
              href="/account"
              buttonText="Account"
            /> */}
            {/* <RoundButton
              href="/join"
              className={styles.button_joinnow}
              buttonText="Join Now"
            /> */}
            {/* <Hamburger setOpen={toggle} /> */}
          </div>
          <div className={styles.menu}>
            <Link onClick={() => handleMenuClick()} href="">
              <CldImage
                className={styles.hamburger_menu}
                alt="BeanbagCoffee/hamburger_ztvs3l"
                width="50"
                height="50"
                src="BeanbagCoffee/hamburger_ztvs3l"
              />
            </Link>
          </div>
          {/* {process.env.FEATURE_SEARCH_ENABLED && (
            <DesktopSearchModal
              state={searchModalState}
              close={searchModalClose}
              open={searchModalOpen}
            />
          )} */}
        </div>
        <div style={{ display: "absolute", top: "0", right: "100px" }}></div>
        <div className={styles.menu}></div>
      </nav>
    </header>
  )
}

export default Nav
