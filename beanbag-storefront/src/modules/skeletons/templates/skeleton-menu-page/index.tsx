import React from "react"
import styles from "./skeleton-menu-page.module.css"
import repeat from "@lib/util/repeat"

const SkeletonMenuPage = () => {
  return (
    <section className={styles.menu_section}>
      <div className={styles.menu_links_container}>
        {/* <ProductRail collection={collection} /> */}
        <div className="spacer_small" />
        <h3>Drinks</h3>

        <ul>
          {repeat(10).map((index) => (
            <div key={index}>
              <li>
                <h1 className={styles.menu_link}>Loading...</h1>
                {/* <ProductRail collection={collection} /> */}
              </li>
            </div>
          ))}
        </ul>
        <div className="spacer_small"></div>
        <h3>At Home</h3>
        <div className="spacer_small" />
        <ul>
          {repeat(10).map((index) => (
            <li key={index}>
              <h1 className={styles.menu_link}>Loading...</h1>
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
          {repeat(10).map((index) => (
            <div>Loading...</div>
            // <MenuCard key={category.id} category={category} />
          ))}
        </div>
        <div className={styles.spacer} />
        <p className={styles.paragraph}>At Home</p>
        <div className={styles.spacer} />
        <div className={styles.menu_divider} />
        <div className={styles.spacer} />
        <div className={styles.menu_card_container}>
          {repeat(10).map((index) => (
            <div>Loading...</div>
            // <MenuCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkeletonMenuPage
