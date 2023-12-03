import { StoreGetProductsParams } from "@medusajs/medusa"
import { useCollections } from "medusa-react"
import { ChangeEvent } from "react"

type RefinementListProps = {
  refinementList: StoreGetProductsParams
  setRefinementList: (refinementList: StoreGetProductsParams) => void
}

const FilterCollections = ({
  refinementList,
  setRefinementList,
}: RefinementListProps) => {
  const { collections, isLoading } = useCollections()

  const handleCollectionChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { checked } = e.target

    const collectionIds = refinementList.collection_id || []

    const exists = collectionIds.includes(id)

    if (checked && !exists) {
      setRefinementList({
        ...refinementList,
        collection_id: [...collectionIds, id],
      })

      return
    }

    if (!checked && exists) {
      setRefinementList({
        ...refinementList,
        collection_id: collectionIds.filter((c) => c !== id),
      })

      return
    }

    return
  }

  return (
    <div>
      <span>Collections</span>
      <ul>
        {collections?.map((c) => (
          <li key={c.id}>
            <label>
              <input
                type="checkbox"
                defaultChecked={refinementList.collection_id?.includes(c.id)}
                onChange={(e) => handleCollectionChange(e, c.id)}
              />
              {c.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterCollections
