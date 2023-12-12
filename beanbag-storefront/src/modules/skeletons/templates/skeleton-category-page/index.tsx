import React from "react"
import styles from "./skeleton-category-page.module.css"
import repeat from "@lib/util/repeat"

const SkeletonCategoryPage = ({
  numberMenuDrinks = 6,
  numberMenuAtHome = 2,
}) => {
  return (
    <div className="loading">
      <section className={styles.menu_section}>
        <div className={styles.menu_links_container}>
          {/* <ProductRail collection={collection} /> */}
          <div className="spacer_small" />
          <h3>Drinks</h3>
          <ul>
            {repeat(numberMenuDrinks).map((index) => (
              <div key={index}>
                <li>
                  <h2 className={styles.menu_link}></h2>
                  {/* <ProductRail collection={collection} /> */}
                </li>
              </div>
            ))}
          </ul>
          <div className="spacer_small"></div>
          <h3>At Home</h3>
          <div className="spacer_small" />
          <ul>
            {repeat(numberMenuAtHome).map((index) => (
              <li key={index}>
                <h2 className={styles.menu_link}></h2>
                {/* <ProductRail collection={collection} /> */}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.menu_container}>
          <h1></h1>
          <div className={styles.spacer} />
          <h2 className={styles.paragraph}></h2>
          <div className={styles.spacer} />
          <div className={styles.menu_divider} />
          <div className={styles.spacer} />
          <div className={styles.menu_card_container}>
            {repeat(8).map((index) => (
              <div key={index} className="menu-product">
                <div className="menu-image" />
                <h2></h2>
              </div>

              // <MenuCard key={category.id} category={category} />
            ))}
          </div>
          <div className={styles.spacer} />
          <h2 className={styles.paragraph}></h2>
          <div className={styles.spacer} />
          <div className={styles.menu_divider} />
          <div className={styles.spacer} />
          <div className={styles.menu_card_container}>
            {repeat(2).map((index) => (
              <div key={index} className="menu-product">
                <div className="menu-image" />
                <h2></h2>
              </div>

              // <MenuCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SkeletonCategoryPage
