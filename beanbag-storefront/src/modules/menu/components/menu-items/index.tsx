"use client"

import { ProductCategoryWithChildren } from "@lib/data"
import { ProductCollection, ProductCategory } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Product } from "@medusajs/product"
import Link from "next/link"
import { MenuCardDataType } from "types/types"
import MenuCard from "../menu-card"
import styles from "./menu-items.module.css"
// import ProductRail from "./product-rail"

const MenuItems = ({
  product_categories,
}: {
  product_categories: ProductCategoryWithChildren[]
}) => {
  // console.log(products, product_categories)

  let drinkCategories = product_categories.filter(
    (category) => category.parent_category?.name === "Drinks"
  )

  let atHomeCategories = product_categories.filter(
    (category) => category.parent_category?.name === "At Home"
  )

  // console.log(drinkCategories)

  return (
    <section className={styles.menu_section}>
      <div className={styles.menu_links_container}>
        {/* <ProductRail collection={collection} /> */}
        <h3>Drinks</h3>
        <div className="spacer_small" />
        <ul>
          {drinkCategories.map((category) => (
            <li key={category.id}>
              <Link href={`/${category.handle}`}>
                <h1>{category.name}</h1>
              </Link>
              {/* <ProductRail collection={collection} /> */}
            </li>
          ))}
        </ul>
        <div className="spacer"></div>
        <h3>At Home</h3>
        <div className="spacer_small" />
        <ul>
          {atHomeCategories.map((category) => (
            <li key={category.id}>
              <Link href={`/${category.handle}`}>
                <h1>{category.name}</h1>
              </Link>
              {/* <ProductRail collection={collection} /> */}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.menu_container}>
        <h2>Menu</h2>
        <div className={styles.spacer} />
        <p className={styles.paragraph}>Drinks</p>
        <div className={styles.spacer} />
        <div className={styles.menu_divider} />
        <div className={styles.spacer} />
        <div className={styles.menu_card_container}>
          {drinkCategories.map((category: ProductCategoryWithChildren) => (
            <MenuCard key={category.id} category={category} />
          ))}
        </div>
        <div className={styles.spacer} />
        <p className={styles.paragraph}>At Home</p>
        <div className={styles.spacer} />
        <div className={styles.menu_divider} />
        <div className={styles.spacer} />
        <div className={styles.menu_card_container}>
          {atHomeCategories.map((category: ProductCategoryWithChildren) => (
            <MenuCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MenuItems
