import { Table } from "@medusajs/ui"

const SkeletonLineItem = () => {
  return (
    <Table.Row>
      <Table.Cell>
        <div />
      </Table.Cell>
      <Table.Cell>
        <div>
          <div />
          <div />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div>
          <div />
          <div />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div>
          <div />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div>
          <div />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default SkeletonLineItem
