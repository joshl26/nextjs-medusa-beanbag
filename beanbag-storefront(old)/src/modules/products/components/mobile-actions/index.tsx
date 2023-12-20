import { Dialog, Transition } from "@headlessui/react"
import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import useToggleState from "@lib/hooks/use-toggle-state"
import { Button } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"
import clsx from "clsx"
import React, { Fragment, useMemo } from "react"
import OptionSelect from "../option-select"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

type MobileActionsProps = {
  product: PricedProduct
  show: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({ product, show }) => {
  const { variant, addToCart, options, inStock, updateOptions } =
    useProductActions()
  const { state, open, close } = useToggleState()

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <>
      <div
      // className={clsx("lg:hidden sticky inset-x-0 bottom-0", {
      //   "pointer-events-none": !show,
      // })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <div>
              <span>{product.title}</span>
              <span>—</span>
              {selectedPrice ? (
                <div>
                  {selectedPrice.price_type === "sale" && (
                    <p>
                      <span>{selectedPrice.original_price}</span>
                    </p>
                  )}
                  <span
                  // className={clsx({
                  //   "text-ui-fg-interactive":
                  //     selectedPrice.price_type === "sale",
                  // })}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              <Button onClick={open} variant="secondary">
                <div>
                  <span>
                    {variant
                      ? Object.values(options).join(" / ")
                      : "Select Options"}
                  </span>
                  <ChevronDown />
                </div>
              </Button>
              <Button onClick={addToCart}>
                {!inStock ? "Out of stock" : "Add to cart"}
              </Button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div />
          </Transition.Child>

          <div >
            <div >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel >
                  <div >
                    <button
                      onClick={close}
                      
                    >
                      <X />
                    </button>
                  </div>
                  <div >
                    {product.variants.length > 1 && (
                      <div >
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
