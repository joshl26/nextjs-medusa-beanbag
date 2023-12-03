import Link from "next/link"
import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { XMark, ArrowRightMini } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import CountrySelect from "../country-select"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Search: "",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ searchModalOpen }: { searchModalOpen: () => void }) => {
  const handleSearchClick = (close: () => void) => {
    searchModalOpen()
    close()
  }

  const toggleState = useToggleState()

  return (
    <div>
      <div>
        <Popover>
          {({ open, close }) => (
            <>
              <div>
                <Popover.Button>Menu</Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel>
                  <div>
                    <div>
                      <button onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    <ul>
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        if (
                          name === "Search" &&
                          process.env.FEATURE_SEARCH_ENABLED
                        ) {
                          return (
                            <li key={name}>
                              <button onClick={() => handleSearchClick(close)}>
                                {name}
                              </button>
                            </li>
                          )
                        }
                        return (
                          <li key={name}>
                            <Link href={href} onClick={close}>
                              {name}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                    <div>
                      <div
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        <CountrySelect toggleState={toggleState} />
                        <ArrowRightMini
                        // className={clx(
                        //   "transition-transform duration-150",
                        //   toggleState.state ? "-rotate-90" : ""
                        // )}
                        />
                      </div>
                      <Text>
                        © {new Date().getFullYear()} Beanbag Coffee Co. All
                        rights reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
