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
}

const Item = ({ item, region }: ItemProps) => {
  return (
    <Table.Row>
      <Table.Cell>
        <div>
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
      </Table.Cell>
      <Table.Cell>
        <Text>{item.title}</Text>
        <LineItemOptions variant={item.variant} />
      </Table.Cell>
      <Table.Cell>
        <span>
          <span>
            <Text>{item.quantity}x </Text>
            <LineItemUnitPrice item={item} region={region} style="tight" />
          </span>
          <LineItemPrice item={item} region={region} style="tight" />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
