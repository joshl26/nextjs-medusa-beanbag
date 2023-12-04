"use client"

import React from "react"
import { MenuCardType } from "../../../../types/types"
import { CldImage } from "next-cloudinary"
import styles from "./menu-card.module.css"
import Link from "next/link"

const MenuCard = ({ menuCard }: MenuCardType) => {
  return (
    <div className={styles.container}>
      <Link href={menuCard.href}>
        <div className={styles.flex_container}>
          <div className={styles.image_container}>
            <CldImage
              sizes="100vw"
              crop="thumb"
              className={styles.image}
              alt={menuCard.imgUrl}
              width={100}
              height={100}
              src={menuCard.imgUrl}
            />
          </div>
          <h3 className={styles.title}>{menuCard.title}</h3>
        </div>
        <div className={styles.spacer}></div>
      </Link>
    </div>
  )
}

export default MenuCard
