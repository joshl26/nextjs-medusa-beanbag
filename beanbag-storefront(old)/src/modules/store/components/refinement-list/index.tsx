import { StoreGetProductsParams } from "@medusajs/medusa"
import SortProducts, { SortOptions } from "./sort-products"
import CollectionFilter from "./collection-filter"

type RefinementListProps = {
  refinementList: StoreGetProductsParams
  setRefinementList: (refinementList: StoreGetProductsParams) => void
  sortBy: SortOptions
  setSortBy: (...args: any[]) => void
  search?: boolean
}

const RefinementList = ({
  refinementList,
  setRefinementList,
  sortBy,
  setSortBy,
  search = false,
}: RefinementListProps) => {
  return (
    <div >
      <SortProducts sortBy={sortBy} setSortBy={setSortBy} />
      {!search && (
        <CollectionFilter
          refinementList={refinementList}
          setRefinementList={setRefinementList}
        />
      )}
    </div>
  )
}

export default RefinementList
