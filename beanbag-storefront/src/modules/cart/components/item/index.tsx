import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
// import { Table, Text, clx } from "@medusajs/ui"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import Link from "next/link"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  type?: "full" | "preview"
}

const Item = ({ item, region, type = "full" }: ItemProps) => {
  const { updateItem, deleteItem } = useStore()
  const { handle } = item.variant.product

  return (
    <>
      <tr>
        <td>
          <Link
            href={`/products/${handle}`}
            // className={clx("flex", {
            //   "w-16": type === "preview",
            //   "small:w-24 w-12": type === "full",
            // })}
          >
            <Thumbnail thumbnail={item.thumbnail} size="square" />
          </Link>
        </td>
        <td style={{ textAlign: "left", paddingLeft: "1rem" }}>
          <p>{item.title}</p>
          <LineItemOptions variant={item.variant} />
        </td>
        {type === "full" && (
          <td>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <CartItemSelect
                value={item.quantity}
                onChange={(value) =>
                  updateItem({
                    lineId: item.id,
                    quantity: parseInt(value.target.value),
                  })
                }
              >
                {Array.from(
                  [
                    ...Array(
                      item.variant.inventory_quantity > 0
                        ? item.variant.inventory_quantity
                        : 10
                    ),
                  ].keys()
                )
                  .slice(0, 10)
                  .map((i) => {
                    const value = i + 1
                    return (
                      <option value={value} key={i}>
                        {value}
                      </option>
                    )
                  })}
              </CartItemSelect>
              <button onClick={() => deleteItem(item.id)}>
                <Trash size={18} />
              </button>
            </div>
          </td>
        )}
        {type === "full" && (
          <td style={{ textAlign: "left" }}>
            <LineItemUnitPrice item={item} region={region} style="tight" />
          </td>
        )}
        <td>
          <span
          // className={clx("!pr-0", {
          //   "flex flex-col items-end h-full justify-center": type === "preview",
          // })}
          >
            {type === "preview" && (
              <span>
                <p>{item.quantity}x </p>
                <LineItemUnitPrice item={item} region={region} style="tight" />
              </span>
            )}
            <LineItemPrice item={item} region={region} style="tight" />
          </span>
        </td>
      </tr>
      <div className="spacer_small"></div>
    </>
  )
}

export default Item
