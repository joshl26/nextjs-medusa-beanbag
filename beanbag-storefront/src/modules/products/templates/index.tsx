"use client"

import React, { useEffect, useRef, useState } from "react"
import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import ProductInfo from "@modules/products/templates/product-info"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ImageGallery from "@modules/products/components/image-gallery"
import MobileActions from "@modules/products/components/mobile-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ProductActions from "../components/product-actions"
import styles from "./templates.module.css"
import Link from "next/link"

type ProductTemplateProps = {
  product: PricedProduct
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false)

  const infoRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(infoRef, "0px")

  useEffect(() => {
    const onboarding = window.sessionStorage.getItem("onboarding")
    setIsOnboarding(onboarding === "true")
  }, [])

  return (
    <ProductProvider product={product}>
      <div>
        <div>
          <div className={styles.row}>
            <Link href="/menu">
              <h2 className={styles.path}>Menu/</h2>
            </Link>
            <Link href={`/${product.collection?.handle}`}>
              <h2 className={styles.path}>{product.collection?.title}/</h2>
            </Link>

            <h2 className={styles.page}>{product.title}</h2>
          </div>

          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        <div style={{ width: "200px" }}>
          <ImageGallery images={product?.images || []} />
        </div>
        <div ref={infoRef}>
          {isOnboarding && <ProductOnboardingCta />}
          <ProductActions product={product} />
        </div>
      </div>
      {/* <div>
        <RelatedProducts product={product} />
      </div> */}
      {/* <MobileActions product={product} show={!inView} /> */}
    </ProductProvider>
  )
}

export default ProductTemplate
