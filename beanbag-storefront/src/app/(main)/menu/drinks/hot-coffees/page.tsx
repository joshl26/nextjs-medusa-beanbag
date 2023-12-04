"use client"

import React from "react"
import { MenuCardDataType } from "../../../../../types/types"
import MenuCard from "@modules/menu/components/menu-card"
import { DrinkData } from "@app/data/drinkData"
import { AtHomeData } from "@app/data/atHomeData"
import {
  brewedCoffeeData,
  cappucinoData,
  expressoData,
} from "@app/data/hotCoffeesData"
import styles from "../../menu.module.css"
import Link from "next/link"

const HotCoffees = () => {
  return (
    <main className="main">
      <section className={styles.menu_section}>
        <div className={styles.menu_links_container}>
          <div className={styles.spacer_small} />
          <h3>Drinks</h3>
          <div className={styles.spacer_small} />
          {DrinkData.map((menuCard: MenuCardDataType) => (
            <Link key={menuCard.id} href={menuCard.href}>
              <h4 className={styles.menu_link}>{menuCard.title}</h4>
              <div className={styles.spacer_small} />
            </Link>
          ))}
          <div className={styles.spacer} />
          <h3>At Home</h3>
          <div className={styles.spacer_small} />
          {AtHomeData.map((menuCard: MenuCardDataType) => (
            <Link key={menuCard.id} href={menuCard.href}>
              <h4 className={styles.menu_link} key={menuCard.id}>
                {menuCard.title}
              </h4>
              <div className={styles.spacer_small}></div>
            </Link>
          ))}
        </div>
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
      </section>
    </main>
  )
}

export default HotCoffees
