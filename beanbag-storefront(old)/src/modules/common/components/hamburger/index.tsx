import clsx from "clsx"
import React from "react"

type HamburgerProps = {
  setOpen: () => void
}

const Hamburger: React.FC<HamburgerProps> = ({ setOpen }) => {
  return (
    <button onClick={setOpen}>
      <span>Open main menu</span>
      <div>
        <span
          aria-hidden="true"
          // className={clsx(
          //   "block absolute h-0.5 w-5 rounded-sm bg-current -translate-y-1.5 "
          // )}
        ></span>
        <span
          aria-hidden="true"
          // className={clsx(
          //   "block absolute  h-0.5 w-5 bg-current rounded-sm transform"
          // )}
        ></span>
        <span
          aria-hidden="true"
          // className={clsx(
          //   "block absolute  h-0.5 w-5 bg-current rounded-sm translate-y-1.5"
          // )}
        ></span>
      </div>
    </button>
  )
}

export default Hamburger
