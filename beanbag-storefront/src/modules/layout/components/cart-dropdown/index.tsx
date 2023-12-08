import { Popover, Transition } from "@headlessui/react"
import { useCartDropdown } from "@lib/context/cart-dropdown-context"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import Button from "@modules/common/components/button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Cart from "@modules/common/icons/cart"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import clsx from "clsx"
import { formatAmount, useCart } from "medusa-react"
import Link from "next/link"
import { Fragment } from "react"
import styles from "./cart-dropdown.module.css"

const CartDropdown = () => {
  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()
  const { state, open, close } = useCartDropdown()

  console.log(state)

  return (
    <div
      style={{ position: "relative", height: "100%", width: "50px" }}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <Popover className={clsx(styles.container, !state && styles.no_border)}>
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
              style={{
                fontFamily: "raleway",
                fontWeight: "800",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              href="/cart"
            >
              {!state ? (
                <>
                  <Cart size={22} style={{ zIndex: "-1" }} />
                  <p>{totalItems > 0 ? `(${totalItems})` : ""}</p>
                </>
              ) : (
                ""
              )}
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
          <Popover.Panel style={{ minWidth: "250px" }} static>
            <Link href="/cart" passHref>
              <h4 style={{ zIndex: "1000", position: "absolute", top: "5px" }}>
                {`My Cart `}{" "}
                <p
                  style={{
                    display: "inline",
                    fontFamily: "raleway",
                    fontWeight: "400",
                  }}
                >
                  {totalItems === 1
                    ? `| ${totalItems} item`
                    : `| ${totalItems} items`}
                </p>
              </h4>
            </Link>
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
                            <div className="spacer_small"></div>

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
                              width: "175px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div className="spacer_small"></div>

                            <div>
                              <div style={{ paddingLeft: "0.5rem" }}>
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
                                <div className="spacer_small"></div>
                                <div
                                  style={{
                                    flexDirection: "row-reverse",
                                    textAlign: "left",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <div className="spacer_small" />{" "}
                                  <LineItemOptions variant={item.variant} />
                                  <div className="spacer_small" />
                                  <span>Quantity: {item.quantity}</span>
                                </div>
                              </div>
                            </div>
                            <div className="spacer_small"></div>
                            <div className="spacer_small"></div>
                            <div>
                              <div style={{ textAlign: "right" }}>
                                <button onClick={() => deleteItem(item.id)}>
                                  <Trash size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>{" "}
                        <div className="spacer_small"></div>
                        <div className="spacer_small"></div>
                        <div className="spacer_small divider" />
                      </>
                    ))}
                </div>
                <div className="spacer_small " />
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>
                      Subtotal <span>(excl. taxes) - </span>
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
                    <Button className="button-style">Go to cart</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <Link href="/menu">
                      <span>Go to main products page</span>
                      <button onClick={close}>Explore products</button>
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
