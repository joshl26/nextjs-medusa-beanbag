import { ProductVariant } from "@medusajs/medusa"
import { Container, Heading, Text } from "@medusajs/ui"
import Thumbnail from "@modules/products/components/thumbnail"
import Link from "next/link"

export type ProductHit = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: ProductVariant[]
  collection_handle: string | null
  collection_id: string | null
}

export type HitProps = {
  hit: ProductHit
}

const Hit = ({ hit }: HitProps) => {
  return (
    <Container
      key={hit.id}
      
    >
      <Thumbnail thumbnail={hit.thumbnail} size="square"  />
      <div >
        <div >
          {hit.collection_id && (
            <Link
              href={`/collections/${hit.collection_handle}`}
              
            >
              {hit.collection_handle}
            </Link>
          )}
          <Text >{hit.title}</Text>
        </div>
      </div>
    </Container>
  )
}

export default Hit
