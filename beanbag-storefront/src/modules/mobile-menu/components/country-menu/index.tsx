import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { useStore } from "@lib/context/store-context"
import useCountryOptions from "@lib/hooks/use-country-options"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"
import ReactCountryFlag from "react-country-flag"

const CountryMenu = () => {
  const {
    close,
    screen: [_, setScreen],
  } = useMobileMenu()

  const { setRegion } = useStore()
  const countryOptions = useCountryOptions()

  const handleSelectCountry = (regionId: string, countryCode: string) => {
    setRegion(regionId, countryCode)
    close()
  }

  return (
    <div>
      <div>
        <div>
          <button onClick={() => setScreen("main")}>
            <ChevronDown size={20} />
          </button>
        </div>
        <div>
          <h1>Shipping To</h1>
        </div>
        <div>
          <button onClick={close}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div>
        <ul className="py-4">
          {countryOptions?.map((option) => (
            <li key={option.country}>
              <button
                onClick={() =>
                  handleSelectCountry(option.region, option.country)
                }
              >
                <div>
                  <ReactCountryFlag svg countryCode={option.country} />
                  <span>{option.label}</span>
                </div>
                <ChevronDown size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CountryMenu
