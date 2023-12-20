"use client"

import { Listbox, Transition } from "@headlessui/react"
import { useStore } from "@lib/context/store-context"
import useToggleState, { StateType } from "@lib/hooks/use-toggle-state"
import { revalidateTags } from "app/actions"
import { useRegions } from "medusa-react"
import { Fragment, useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  toggleState: StateType
}

const CountrySelect = ({ toggleState }: CountrySelectProps) => {
  const { countryCode, setRegion } = useStore()
  const { regions } = useRegions()
  const [current, setCurrent] = useState<CountryOption | undefined>(undefined)

  const { state, open, close } = toggleState

  const options: CountryOption[] | undefined = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o.country === countryCode)
      setCurrent(option)
    }
  }, [countryCode, options])

  const handleChange = (option: CountryOption) => {
    revalidateTags(["medusa_request", "products", "collections"])
    setRegion(option.region, option.country)
    close()
  }

  return (
    <div>
      <Listbox
        onChange={handleChange}
        defaultValue={
          countryCode
            ? options?.find((o) => o.country === countryCode)
            : undefined
        }
      >
        <Listbox.Button>
          <div>
            <span>Shipping to:</span>
            {current && (
              <span>
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={current.country}
                />
                {current.label}
              </span>
            )}
          </div>
        </Listbox.Button>
        <div>
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options static>
              {options?.map((o, index) => {
                return (
                  <Listbox.Option key={index} value={o}>
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={o.country}
                    />{" "}
                    {o.label}
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CountrySelect
