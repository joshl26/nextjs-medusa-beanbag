import repeat from "@lib/util/repeat"
import { Heading, Table } from "@medusajs/ui"
import SkeletonCartItem from "@modules/skeletons/components/skeleton-cart-item"
import SkeletonCodeForm from "@modules/skeletons/components/skeleton-code-form"
import SkeletonOrderSummary from "@modules/skeletons/components/skeleton-order-summary"

const SkeletonCartPage = () => {
  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div />
                <div />
              </div>
              <div>
                <div />
              </div>
            </div>
            <div>
              <div>
                <div />
              </div>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <div />
                    </Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>
                      <div />
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <div />
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <div>
                        <div />
                      </div>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {repeat(4).map((index) => (
                    <SkeletonCartItem key={index} />
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
          <div>
            <SkeletonOrderSummary />
            <SkeletonCodeForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCartPage
