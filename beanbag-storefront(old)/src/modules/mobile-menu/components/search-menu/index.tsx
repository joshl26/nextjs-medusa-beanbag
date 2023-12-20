import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { searchClient, SEARCH_INDEX_NAME } from "@lib/search-client"
import { MagnifyingGlassMini } from "@medusajs/icons"
import MobileHit from "@modules/search/components/mobile-hit"
import MobileHits from "@modules/search/components/mobile-hits"
import SearchBox from "@modules/search/components/search-box"
import { InstantSearch } from "react-instantsearch-hooks-web"

const SearchMenu = () => {
  const {
    screen: [_, setScreen],
    close,
  } = useMobileMenu()

  return (
    <InstantSearch searchClient={searchClient} indexName={SEARCH_INDEX_NAME}>
      <div>
        <div>
          <div>
            <div>
              <MagnifyingGlassMini />
              <SearchBox close={close} />
            </div>
          </div>
          <div>
            <button onClick={() => setScreen("main")}>Cancel</button>
          </div>
        </div>

        <div>
          <MobileHits hitComponent={MobileHit} />
        </div>
      </div>
    </InstantSearch>
  )
}

export default SearchMenu
