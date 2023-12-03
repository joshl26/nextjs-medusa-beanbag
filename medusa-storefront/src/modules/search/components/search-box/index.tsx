import { XMarkMini } from "@medusajs/icons"
import { FormEvent } from "react"
import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from "../search-box-wrapper"

const ControlledSearchBox = ({
  inputRef,
  isSearchStalled,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  close,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (onSubmit) {
      onSubmit(event)
      close()
    }

    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    onReset(event)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div {...props} >
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div >
          <input
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              
            >
              <XMarkMini />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const SearchBox = ({ close }: { close: () => void }) => {
  return (
    <SearchBoxWrapper>
      {(props) => {
        return (
          <>
            <ControlledSearchBox close={close} {...props} />
          </>
        )
      }}
    </SearchBoxWrapper>
  )
}

export default SearchBox
