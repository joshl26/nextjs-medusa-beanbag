import { Popover, Transition } from "@headlessui/react"
import { useCartDropdown } from "@lib/context/cart-dropdown-context"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { Button } from "@medusajs/ui"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount, useCart } from "medusa-react"
import Link from "next/link"
import { Fragment } from "react"
import styles from "./cart-dropdown.module.css"

const CartDropdown = () => {
  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()
  const { state, open, close } = useCartDropdown()

  return (
    <div
      style={{ position: "relative", height: "100%", width: "100px" }}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <Popover className={styles.container}>
        <div style={{ width: "100%", textAlign: "right" }}>
          <Popover.Button
            style={{
              background: "transparent",
              color: "black",
              border: "none",
              padding: "0.25rem",
              height: "100%",
            }}
          >
            <Link
              style={{ fontFamily: "raleway", fontWeight: "800" }}
              href="/cart"
            >
              {`Cart (${totalItems})`}
            </Link>
          </Popover.Button>
        </div>

        <Transition
          show={state}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel static>
            <h3 style={{ position: "absolute", top: "5px" }}>
              {`In your Cart, `}{" "}
              <p
                style={{
                  display: "inline",
                  fontFamily: "raleway",
                  fontWeight: "400",
                }}
              >
                {totalItems === 1
                  ? `${totalItems} item`
                  : `${totalItems} items`}
              </p>
            </h3>
            <div className="spacer_small"></div>
            {cart && items?.length ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {items
                    .sort((a, b) => {
                      return a.created_at > b.created_at ? -1 : 1
                    })
                    .map((item) => (
                      <>
                        <div
                          style={{ display: "flex", flexDirection: "row" }}
                          key={item.id}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Link
                              href={`/products/${item.variant.product.handle}`}
                            >
                              <Thumbnail
                                thumbnail={item.thumbnail}
                                size="small"
                              />
                            </Link>
                          </div>
                          <div
                            style={{
                              width: "200px",
                              display: "flex",
                              flexDirection: "column",
                              padding: "0.25rem",
                            }}
                          >
                            <div>
                              <div style={{ margin: "0.25rem" }}>
                                <LineItemPrice
                                  region={cart.region}
                                  item={item}
                                  style="tight"
                                />
                                <div className="spacer_small" />
                                <h4>
                                  <Link
                                    href={`/products/${item.variant.product.handle}`}
                                  >
                                    {item.title}
                                  </Link>
                                </h4>
                                <div className="spacer_small" />
                                <LineItemOptions variant={item.variant} />
                                <div className="spacer_small" />
                                <span>Quantity: {item.quantity}</span>
                              </div>
                            </div>
                            <div>
                              <div style={{ textAlign: "right" }}>
                                <button onClick={() => deleteItem(item.id)}>
                                  <Trash size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="spacer_small" />
                      </>
                    ))}
                </div>
                <div className="spacer_small" />
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>
                      Subtotal <span>(excl. taxes)</span>
                    </span>
                    <span>
                      {formatAmount({
                        amount: cart.subtotal || 0,
                        region: cart.region,
                        includeTaxes: false,
                      })}
                    </span>
                  </div>
                  <div className="spacer_small" />
                  <Link href="/cart" passHref>
                    <Button size="large">Go to cart</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div>
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <Link href="/store">
                      <span>Go to all products page</span>
                      <Button onClick={close}>Explore products</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
