"use client"

// import clsx from "clsx"
import { useCollections, useProductCategories } from "medusa-react"
import { Text } from "@medusajs/ui"
import Link from "next/link"
import CoffeeBeanCTA from "../coffee-bean-cta"

const FooterNav = () => {
  const { collections } = useCollections()
  const { product_categories } = useProductCategories()

  return (
    <div>
      <div>
        <div>
          <div>
            <Link href="/">Medusa Store</Link>
          </div>
          <div>
            {product_categories && (
              <div>
                <span>Categories</span>
                <ul>
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li key={c.id}>
                        <Link
                          // className={clsx(
                          //   "hover:text-ui-fg-base",
                          //   children && "txt-small-plus"
                          // )}
                          href={`/${c.handle}`}
                        >
                          {c.name}
                        </Link>
                        {children && (
                          <ul>
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <Link href={`/${child.handle}`}>
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && (
              <div>
                <span>Collections</span>
                <ul
                // className={clsx(
                //   "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                //   {
                //     "grid-cols-2": (collections?.length || 0) > 3,
                //   }
                // )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <Link href={`/collections/${c.handle}`}>{c.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div>
          <Text>
            © {new Date().getFullYear()} Beanbag Coffee Co. All rights reserved.
          </Text>
          <CoffeeBeanCTA />
        </div>
      </div>
    </div>
  )
}

export default FooterNav
