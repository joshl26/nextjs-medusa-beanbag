import clsx from "clsx"

const Radio = ({ checked }: { checked: boolean }) => {
  return (
    <>
      <button
        type="button"
        role="radio"
        aria-checked="true"
        data-state={checked ? "checked" : "unchecked"}
      >
        <div>
          {checked && (
            <span data-state={checked ? "checked" : "unchecked"}>
              <div></div>
            </span>
          )}
        </div>
      </button>
      {/* <div
        className={clsx(
          "h-3 w-3 rounded-full border border-gray-200 flex items-center justify-center",
          {
            "border-gray-900": checked,
          }
        )}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-gray-900" />}
      </div> */}
    </>
  )
}

export default Radio
