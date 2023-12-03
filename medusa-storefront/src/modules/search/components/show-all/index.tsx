import { useModal } from "@lib/context/modal-context"
import { Container, Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import { useHits, useSearchBox } from "react-instantsearch-hooks-web"

const ShowAll = ({ close }: { close: () => void }) => {
  const { hits } = useHits()
  const { query } = useSearchBox()

  if (query === "") return null
  if (hits.length > 0 && hits.length <= 6) return null

  if (hits.length === 0) {
    return (
      <Container >
        <Text>No results found.</Text>
      </Container>
    )
  }

  return (
    <Container >
      <Text>Showing the first 6 results.</Text>
      <InteractiveLink href={`/search/${query}`} onClick={close}>
        View all
      </InteractiveLink>
    </Container>
  )
}

export default ShowAll
