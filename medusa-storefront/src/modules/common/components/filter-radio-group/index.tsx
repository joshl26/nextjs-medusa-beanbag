import { Label, RadioGroup, Text, clx } from "@medusajs/ui"
import { EllipseMiniSolid } from "@medusajs/icons"
import { ChangeEvent } from "react"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
}: FilterRadioGroupProps) => {
  return (
    <div>
      <Text>{title}</Text>
      <RadioGroup>
        {items?.map((i) => (
          <div
            key={i.value}
            // className={clx("flex gap-x-2 items-center", {
            //   "ml-[-1.75rem]": i.value === value,
            // })}
          >
            {i.value === value && <EllipseMiniSolid />}
            <RadioGroup.Item
              checked={i.value === value}
              onClick={(e) =>
                handleChange(
                  e as unknown as ChangeEvent<HTMLButtonElement>,
                  i.value
                )
              }
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              // className={clx(
              //   "text-ui-fg-subtle txt-compact-small-plus hover:cursor-pointer",
              //   {
              //     "text-ui-fg-base": i.value === value,
              //   }
              // )}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
