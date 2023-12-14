"use client"

import React from "react"
import { CldImage } from "next-cloudinary"
import styles from "./menu-card.module.css"
import Link from "next/link"
import { DrinkData } from "@app/data/drinkData"
import { AtHomeData } from "@app/data/atHomeData"

//TODO clear type error without any
const MenuCard = ({ category }: any) => {
  // console.log(category)
  // console.log(DrinkData)
  // console.log(AtHomeData)

  let [filteredDrinkProducts] = DrinkData.filter(
    (drink: any) => drink.title === category.name
  )

  let [filteredAtHomeProducts] = AtHomeData.filter(
    (atHome: any) => atHome.title === category.name
  )

  return (
    <Link
      className={`${styles.flex_container} ${styles.menu_link}`}
      href={category.handle}
    >
      <div className={styles.flex_container}>
        <div className={styles.image_container}>
          {filteredDrinkProducts?.imgUrl ? (
            <CldImage
              sizes="100vw"
              crop="thumb"
              className={styles.image}
              alt={filteredDrinkProducts.imgUrl}
              width={100}
              height={100}
              src={filteredDrinkProducts.imgUrl}
            />
          ) : (
            ""
          )}
          {filteredAtHomeProducts?.imgUrl ? (
            <CldImage
              sizes="100vw"
              crop="thumb"
              className={styles.image}
              alt={filteredAtHomeProducts.alt}
              width={100}
              height={100}
              src={filteredAtHomeProducts.imgUrl}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <h1 className={styles.menu_link}>{category.name}</h1>
      <div className={styles.spacer}></div>
    </Link>
  )
}

export default MenuCard
