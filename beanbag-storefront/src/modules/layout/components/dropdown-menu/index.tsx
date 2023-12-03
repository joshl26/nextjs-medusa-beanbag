import { Popover, Transition } from "@headlessui/react"
import {
  useFeaturedProductsQuery,
  useNavigationCollections,
} from "@lib/hooks/use-layout-data"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
// import clsx from "clsx"
import { chunk } from "lodash"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const DropdownMenu = () => {
  const [open, setOpen] = useState(false)
  const { push } = useRouter()
  const { data: collections, isLoading: loadingCollections } =
    useNavigationCollections()
  const { data: products, isLoading: loadingProducts } =
    useFeaturedProductsQuery()

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div>
        <Popover>
          <>
            <Link href="/store" passHref>
              <Popover.Button
                // className={clsx(
                //   "relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none"
                // )}
                onClick={() => push("/store")}
              >
                Store
              </Popover.Button>
            </Link>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel static>
                <div>
                  <div>
                    <div>
                      <h3>Collections</h3>
                      <div>
                        {collections &&
                          chunk(collections, 6).map((chunk, index) => {
                            return (
                              <ul key={index}>
                                {chunk.map((collection) => {
                                  return (
                                    <div key={collection.handle}>
                                      <Link
                                        href={`/collections/${collection.handle}`}
                                        onClick={() => setOpen(false)}
                                      >
                                        {collection.title}
                                      </Link>
                                    </div>
                                  )
                                })}
                              </ul>
                            )
                          })}
                        {loadingCollections &&
                          repeat(6).map((index) => <div key={index} />)}
                      </div>
                    </div>
                    <div>
                      <div>
                        {products?.slice(0, 3).map((product) => (
                          <ProductPreview {...product} key={product.id} />
                        ))}
                        {loadingProducts &&
                          repeat(3).map((index) => (
                            <SkeletonProductPreview key={index} />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
    </div>
  )
}

export default DropdownMenu
