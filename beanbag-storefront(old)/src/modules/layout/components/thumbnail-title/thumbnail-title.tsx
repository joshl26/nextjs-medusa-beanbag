import React from "react"
import styles from "./thumbnail-title.module.css"
import {
  brewedCoffeeData,
  cappucinoData,
  expressoData,
} from "@app/data/hotCoffeesData"
import MenuCard from "@modules/menu/components/menu-card"
import { MenuCardDataType } from "../../../../types/types"

const ThumbNailTitle = () => {
  return (
    <div className={styles.menu_container}>
      <h2>Hot Coffees</h2>
      <div className={styles.spacer} />
      <p className={styles.paragraph}>Brewed Coffees</p>
      <div className={styles.spacer} />
      <div className={styles.menu_divider} />
      <div className={styles.spacer} />
      <div className={styles.menu_card_container}>
        {brewedCoffeeData.map((menuCard: MenuCardDataType) => (
          <MenuCard key={menuCard.id} menuCard={menuCard} />
        ))}
      </div>
      {/* comment */}
      <div className={styles.spacer} />
      <p className={styles.paragraph}>Cappucinos</p>
      <div className={styles.spacer} />
      <div className={styles.menu_divider} />
      <div className={styles.spacer} />
      <div className={styles.menu_card_container}>
        {cappucinoData.map((menuCard: MenuCardDataType) => (
          <MenuCard key={menuCard.id} menuCard={menuCard} />
        ))}
      </div>
      {/* comment */}
      <div className={styles.spacer} />
      <p className={styles.paragraph}>Expressos</p>
      <div className={styles.spacer} />
      <div className={styles.menu_divider} />
      <div className={styles.spacer} />
      <div className={styles.menu_card_container}>
        {expressoData.map((menuCard: MenuCardDataType) => (
          <MenuCard key={menuCard.id} menuCard={menuCard} />
        ))}
      </div>
    </div>
  )
}

export default ThumbNailTitle
