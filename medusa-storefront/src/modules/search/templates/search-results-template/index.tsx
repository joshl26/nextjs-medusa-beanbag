"use client"

import { StoreGetProductsParams } from "@medusajs/medusa"
import { Heading, Text } from "@medusajs/ui"
import InfiniteProducts from "@modules/products/components/infinite-products"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import Link from "next/link"
import { useEffect, useState } from "react"

type SearchResultsTemplateProps = {
  query: string
  hits: Record<string, any>[]
}

const SearchResultsTemplate = ({ query, hits }: SearchResultsTemplateProps) => {
  const [params, setParams] = useState<StoreGetProductsParams>({})
  const [sortBy, setSortBy] = useState<SortOptions>("created_at")

  useEffect(() => {
    setParams({
      id: hits.map((h) => (h.hasOwnProperty("objectID") ? h.objectID : h.id)),
    })
  }, [hits])

  return (
    <div>
      <div>
        <div>
          <Text>Search Results for:</Text>
          <Heading>
            {query} ({hits.length})
          </Heading>
        </div>
        <Link href="/store">Clear</Link>
      </div>
      <div>
        {hits.length > 0 ? (
          <>
            <RefinementList
              refinementList={params}
              setRefinementList={setParams}
              sortBy={sortBy}
              setSortBy={setSortBy}
              search
            />
            <InfiniteProducts params={params} sortBy={sortBy} />
          </>
        ) : (
          <Text>No results.</Text>
        )}
      </div>
    </div>
  )
}

export default SearchResultsTemplate
