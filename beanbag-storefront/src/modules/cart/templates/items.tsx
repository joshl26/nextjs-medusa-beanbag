import { LineItem, Region } from "@medusajs/medusa"
import { Heading, Table } from "@medusajs/ui"
import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => {
  return (
    <div>
      <table>
        <thead style={{ borderBottom: "black 2px solid" }}>
          <tr style={{ textAlign: "left" }}>
            <th style={{ width: "20%" }}>Item</th>
            <th style={{ width: "30%" }}></th>
            <th style={{ width: "20%" }}>Quantity</th>
            <th style={{ width: "15%" }}>Price</th>
            <th style={{ width: "15%" }}>Total</th>
          </tr>
          <div className="spacer_small"></div>
        </thead>
        <tbody>
          {items && region
            ? items
                .sort((a, b) => {
                  return a.created_at > b.created_at ? -1 : 1
                })
                .map((item) => {
                  return <Item key={item.id} item={item} region={region} />
                })
            : Array.from(Array(5).keys()).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </tbody>
      </table>
    </div>
  )
}

export default ItemsTemplate
