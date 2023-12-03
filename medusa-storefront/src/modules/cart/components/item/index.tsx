import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import { Table, Text, clx } from "@medusajs/ui"
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
    <Table.Row >
      <Table.Cell >
        <Link
          href={`/products/${handle}`}
          // className={clx("flex", {
          //   "w-16": type === "preview",
          //   "small:w-24 w-12": type === "full",
          // })}
        >
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </Link>
      </Table.Cell>

      <Table.Cell >
        <Text >{item.title}</Text>
        <LineItemOptions variant={item.variant} />
      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div >
            <button
              
              onClick={() => deleteItem(item.id)}
            >
              <Trash size={18} />
            </button>
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
          </div>
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell >
          <LineItemUnitPrice item={item} region={region} style="tight" />
        </Table.Cell>
      )}

      <Table.Cell >
        <span
          // className={clx("!pr-0", {
          //   "flex flex-col items-end h-full justify-center": type === "preview",
          // })}
        >
          {type === "preview" && (
            <span >
              <Text >{item.quantity}x </Text>
              <LineItemUnitPrice item={item} region={region} style="tight" />
            </span>
          )}
          <LineItemPrice item={item} region={region} style="tight" />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
