import React from "react"
import { getCategoriesList, getCollectionsList } from "@lib/data"
import { MenuCardDataType } from "../../../types/types"
import MenuCard from "@modules/menu/components/menu-card"
import { DrinkData } from "@app/data/drinkData"
import { AtHomeData } from "@app/data/atHomeData"
import styles from "./menu.module.css"
import Link from "next/link"
import FeaturedProducts from "@modules/home/components/featured-products(old)"
import MenuItems from "@modules/menu/components/menu-items"

export default async function Menu() {
  const { collections } = await getCollectionsList(0, 3)
  const { product_categories } = await getCategoriesList(0, 100)

  console.log(collections, product_categories)

  return (
    <main className="main">
      {/* <FeaturedProducts collections={collections} /> */}

      <section className={styles.menu_section}>
        <div className={styles.menu_links_container}>
          <MenuItems
            collections={collections}
            product_categories={product_categories}
          />
        </div>
      </section>

      {/* <section className={styles.menu_section}>
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
          <h2>Menu</h2>
          <div className={styles.spacer} />
          <p className={styles.paragraph}>Drinks</p>
          <div className={styles.spacer} />
          <div className={styles.menu_divider} />
          <div className={styles.spacer} />
          <div className={styles.menu_card_container}>
            {DrinkData.map((menuCard: MenuCardDataType) => (
              <MenuCard key={menuCard.id} menuCard={menuCard} />
            ))}
          </div>
          <div className={styles.spacer} />
          <p className={styles.paragraph}>At Home</p>
          <div className={styles.spacer} />
          <div className={styles.menu_divider} />
          <div className={styles.spacer} />
          <div className={styles.menu_card_container}>
            {AtHomeData.map((menuCard: MenuCardDataType) => (
              <MenuCard key={menuCard.id} menuCard={menuCard} />
            ))}
          </div>
        </div>
      </section> */}
    </main>
  )
}
