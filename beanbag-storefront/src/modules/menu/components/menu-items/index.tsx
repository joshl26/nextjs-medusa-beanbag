"use client"

import { ProductCategoryWithChildren } from "@lib/data"
import { ProductCollection, ProductCategory } from "@medusajs/medusa"
import Link from "next/link"
// import ProductRail from "./product-rail"

const MenuItems = ({
  collections,
  product_categories,
}: {
  collections: ProductCollection[]
  product_categories: ProductCategoryWithChildren[]
}) => {
  // console.log(product_categories)

  let drinkCategories = product_categories.filter(
    (category) => category.parent_category?.name === "Drinks"
  )

  let atHomeCategories = product_categories.filter(
    (category) => category.parent_category?.name === "At Home"
  )

  // console.log(drinkCategories)

  return (
    <div>
      <div>
        {/* <ul>
          {collections.map((collection) => (
            <li key={collection.id}>
              <h1>{collection.title}</h1> */}
        {/* <ProductRail collection={collection} /> */}
        {/* </li>
          ))}
        </ul> */}
        {/* <ul>
          {product_categories.filter((category) => (
            <li key={category.id}>
              <Link href={`/${category.handle}`}>
                <h1>{category.name}</h1>
              </Link>

              {/* <ProductRail collection={collection} /> 
            </li>
          ))}
        </ul> */}

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
    </div>
  )
}

export default MenuItems
