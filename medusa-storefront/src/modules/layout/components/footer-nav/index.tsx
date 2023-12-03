"use client"

import React from "react"
import styles from "./footer-nav.module.css"
import Link from "next/link"
import { CldImage } from "next-cloudinary"

const FooterNav = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.spacer}></div>
        <div className={styles.social_icons}>
          <CldImage
            className={styles.social_image}
            alt="BeanbagCoffee/instagram_vjpgd3"
            width="50"
            height="50"
            src="BeanbagCoffee/instagram_vjpgd3"
          />
          <CldImage
            className={styles.social_image}
            alt="BeanbagCoffee/linkedIn_g57wsg"
            width="50"
            height="50"
            src="BeanbagCoffee/linkedIn_g57wsg"
          />
          <CldImage
            className={styles.social_image}
            alt="BeanbagCoffee/facebook_czenso"
            width="50"
            height="50"
            src="BeanbagCoffee/facebook_czenso"
          />
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.footer_row}>
          <Link href="/privacy">
            <h3 className={styles.link}>Privacy Notice</h3>
          </Link>
          <h3 className={styles.link}>|</h3>
          <Link href="/terms-of-service">
            <h3 className={styles.link}>Terms of Use</h3>
          </Link>
          <h3 className={styles.link}>|</h3>
          <Link href="/no-share">
            <h3 className={styles.link}>
              Do Not Share My Personal Information
            </h3>
          </Link>
          <h3 className={styles.link}>|</h3>
          <Link className={styles.link} href="/partners">
            <h3 className={styles.link}>Partners</h3>
          </Link>
        </div>
        <div className={styles.spacer}></div>
        <p>2023 Beanbag Coffee Co. All rights reserved.</p>
      </div>
      <div className={styles.spacer}></div>
    </div>
  )
}

export default FooterNav
