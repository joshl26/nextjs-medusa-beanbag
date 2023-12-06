import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption } from "@medusajs/medusa"
import clsx from "clsx"
import React from "react"
import styles from "./drink-size-option-select.module.css"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
}

const DrinkSizeOptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div>
      <span className={styles.title}>{title} Options</span>
      <div className="spacer_small"></div>
      <div className={styles.row}>
        {filteredOptions.map((v) => {
          return (
            <div className={styles.column} key={v}>
              <button
                onClick={() => updateOption({ [option.id]: v })}

                // className={clsx(
                //   "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 ",
                //   {
                //     "border-ui-border-interactive": v === current,
                //     "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                //       v !== current,
                //   }
                // )}
              >
                {v}
              </button>
            </div>
          )
        })}
      </div>
      <div className="spacer_small"></div>
    </div>
  )
}

export default DrinkSizeOptionSelect
