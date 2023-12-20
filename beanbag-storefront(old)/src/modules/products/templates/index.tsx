"use client"

import React, { useEffect, useRef, useState } from "react"
import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
// import ProductInfo from "@modules/products/templates/product-info"
// import ProductTabs from "@modules/products/components/product-tabs"
// import RelatedProducts from "@modules/products/components/related-products"
import ImageGallery from "@modules/products/components/image-gallery"
// import MobileActions from "@modules/products/components/mobile-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ProductActions from "../components/product-actions"
import styles from "./templates.module.css"
import Link from "next/link"
import Image from "next/image"

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
          <div className="root-container">
            <section className={styles.row}>
              <Link href="/menu">
                <h2 className={styles.path}>Menu/</h2>
              </Link>
              <Link href={`/${product.collection?.handle}`}>
                <h2 className={styles.path}>{product.collection?.title}/</h2>
              </Link>
              <h2 className={styles.page}>{product.title}</h2>
            </section>
          </div>

          <section>
            <div
              style={{
                position: "absolute",
                left: "0px",
                width: "100vw",
                height: "40vh",
                background: "rgb(3, 87, 57)",
                margin: "0 auto",
                zIndex: "-100",
              }}
            >
              <div className="root-container">
                <div className="row">
                  <div
                    style={{
                      overflow: "hidden",
                      width: "500px",
                      height: "40vh",
                      textAlign: "left",
                    }}
                    className="column"
                  >
                    {product?.thumbnail ? (
                      <Image
                        alt={product.thumbnail}
                        width={500}
                        height={500}
                        src={product.thumbnail}
                      />
                    ) : (
                      <h2>No Thumbnail Image</h2>
                    )}
                  </div>
                  <div style={{ height: "40vh" }} className={styles.column}>
                    <div className={styles.header}>
                      <h1 className={styles.title}>{product.title}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: "40vh" }}></div>
          </section>
          {/* <ProductInfo product={product} /> */}
          {/* <ProductTabs product={product} /> */}
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
      <div
        style={{
          position: "absolute",
          left: "0px",
          width: "100vw",
          height: "40vh",
          background: "rgb(3, 87, 57)",
          margin: "0 auto",
          zIndex: "-100",
        }}
      >
        <div className="root-container">
          <div className="spacer"></div>
          <h1 className={styles.description}>{product.description}</h1>
        </div>
      </div>
      <div style={{ height: "40vh" }}></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ImageGallery images={product?.images || []} />
      </div>
    </ProductProvider>
  )
}

export default ProductTemplate
