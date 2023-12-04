import React from "react"
import { getCategoriesList } from "@lib/data"
import MenuItems from "@modules/menu/components/menu-items"

export default async function Menu() {
  // const { collections } = await getCollectionsList(0, 3)
  const { product_categories } = await getCategoriesList(0, 100)

  // async function getProducts() {
  //   return medusaClient.products
  //     .list()
  //     .then(({ products, limit, offset, count }) => {
  //       return products
  //     })
  // }

  // let products = await getProducts()
  // console.log(products)

  return (
    <main className="main">
      {/* <FeaturedProducts collections={collections} /> */}
      <MenuItems product_categories={product_categories} />
    </main>
  )
}
