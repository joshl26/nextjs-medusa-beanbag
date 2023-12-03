import RoundButton from "@modules/common/components/round-button"
import Link from "next/link"
import React from "react"
import styles from "./side-menu.module.css"

type SideMenuProps = {
  setMenuEnabled: (argument: boolean) => void
}

const SideMenu = ({ setMenuEnabled }: SideMenuProps) => {
  return (
    <div className={styles.side_menu_container}>
      <div className={styles.side_menu_inner_container}>
        <div>
          <div className={styles.link_container}>
            <h2 className={styles.link}>
              <Link onClick={() => setMenuEnabled(false)} href="/menu">
                Menu
              </Link>
            </h2>
            <h2 className={styles.link}>
              <Link onClick={() => setMenuEnabled(false)} href="/rewards">
                Rewards
              </Link>
            </h2>
            <h2 className={styles.link}>
              <Link onClick={() => setMenuEnabled(false)} href="/gift-cards">
                Gift Cards
              </Link>
            </h2>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.spacer}></div>
          <div onClick={() => setMenuEnabled(false)}>
            <RoundButton
              href="/signin"
              className={styles.button_signin}
              buttonText="Sign In"
            />
            <RoundButton
              href="/join"
              className={styles.button_joinnow}
              buttonText="Join Now"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
