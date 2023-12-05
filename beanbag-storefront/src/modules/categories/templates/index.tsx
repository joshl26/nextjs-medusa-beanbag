"use client"

import usePreviews from "@lib/hooks/use-previews"
import {
  ProductCategoryWithChildren,
  getProductsByCategoryHandle,
} from "@lib/data"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import UnderlineLink from "@modules/common/components/interactive-link"
import { notFound } from "next/navigation"
import styles from "@modules/menu/components/menu-items/menu-items.module.css"

type CategoryTemplateProps = {
  categories: ProductCategoryWithChildren[]
  all_categories: ProductCategoryWithChildren[]
}

const CategoryTemplate: React.FC<CategoryTemplateProps> = ({
  categories,
  all_categories,
}) => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category) notFound()

  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [`get_category_products`, category.handle, cart?.id],
    ({ pageParam }) =>
      getProductsByCategoryHandle({
        pageParam,
        handle: category.handle!,
        cartId: cart?.id,
        currencyCode: cart?.region?.currency_code,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  useEffect(() => {
    if (cart?.region_id) {
      refetch()
    }
  }, [cart?.region_id, refetch])

  const previews = usePreviews({
    pages: infiniteData?.pages,
    region: cart?.region,
  })

  let drinkCategories = all_categories.filter(
    (category) => category.parent_category?.name == "Drinks"
  )

  let atHomeCategories = all_categories.filter(
    (category) => category.parent_category?.name == "At Home"
  )

  // console.log(category.category_children)
  // console.log(all_categories)
  // console.log(category)
  // console.log(categories)
  // console.log(previews)
  // console.log(filteredPreviews)
  // console.log(children)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  return (
    <section className={styles.menu_section}>
      <div className={styles.menu_links_container}>
        {/* <ProductRail collection={collection} /> */}
        <div className="spacer_small" />
        <h3>Drinks</h3>
        <ul>
          {drinkCategories.map((category) => (
            <li key={category.id}>
              <Link href={`/${category.handle}`}>
                <h1 className={styles.menu_link}>{category.name}</h1>
              </Link>
              {/* <ProductRail collection={collection} />*/}
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
                <h1 className={styles.menu_link}>{category.name}</h1>
              </Link>
              {/* <ProductRail collection={collection} />  */}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.menu_container}>
        <div>
          <div>
            {parents &&
              parents.map((parent) => (
                <span key={parent.id}>
                  <Link href={`/${parent.handle}`}>{parent.name}</Link>/
                </span>
              ))}
            <h1>{category.name}</h1>
          </div>
          <div className="spacer_small"></div>
          {category.description && (
            <div>
              <h3>{category.description}</h3>
            </div>
          )}
          {category.category_children && (
            <div>
              <ul>
                {category.category_children?.map((c) => (
                  <li key={c.id}>
                    {/* <UnderlineLink href={`/${c.handle}`}> */}
                    {c.name}
                    {/* </UnderlineLink> */}{" "}
                    <ul>
                      {all_categories
                        .filter(
                          (category) => category.parent_category?.name == c.name
                        )
                        .map((c) => (
                          <li key={c.id}>
                            <ul>
                              {previews
                                .filter(
                                  (preview) => preview?.handle == c.handle
                                )
                                .map((c) => (
                                  <li key={c.id}>
                                    <ProductPreview {...c} />
                                  </li>
                                ))}
                            </ul>
                          </li>
                        ))}
                      {isFetchingNextPage &&
                        repeat(getNumberOfSkeletons(infiniteData?.pages)).map(
                          (index) => (
                            <li key={index}>
                              <SkeletonProductPreview />
                            </li>
                          )
                        )}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div ref={ref}>
            <span ref={ref}></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryTemplate
